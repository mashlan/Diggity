using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;
using Diggity.Entities;

namespace Diggity.Repository
{
    /// <summary>
    /// converts an expression of type TOld to expression of type TNew
    /// </summary>
    public class Converter
    {
        private static readonly Assembly assembly = Assembly.GetAssembly(typeof(Exercise));

        public static Expression<Func<TNewTarget, bool>> TransformPredicateLambda<TOldTarget, TNewTarget>(Expression<Func<TOldTarget, bool>> predicate)
        {
            var lambda = (LambdaExpression)predicate;
            if (lambda == null) return null;

            var param = Expression.Parameter(typeof(TNewTarget), predicate.Parameters[0].Name);

            var mutator = new ExpressionTargetTypeMutator(param);
            var converted = mutator.Visit(predicate.Body);

            return Expression.Lambda<Func<TNewTarget, bool>>(converted, predicate.Name, predicate.TailCall, new[] { param });
        }

        public static Expression<Func<TNewTarget, TProperty>> TransformPredicateLambda<TOldTarget, TNewTarget, TProperty>(Expression<Func<TOldTarget, TProperty>> predicate)
        {
            var lambda = (LambdaExpression)predicate;
            if (lambda == null) return null;

            var param = Expression.Parameter(typeof(TNewTarget), predicate.Parameters[0].Name);

            var mutator = new ExpressionTargetTypeMutator(param);
            var converted = mutator.Visit(predicate.Body);

            return Expression.Lambda<Func<TNewTarget, TProperty>>(converted, predicate.Name, predicate.TailCall, new[] { param });
        }

        private static Expression VisitInnerExpression<TNewTarget, T>(Expression<T> node, TNewTarget newTarget) where TNewTarget : Type
        {
            var param = Expression.Parameter(newTarget, node.Parameters[0].Name);
            var mutator = new ExpressionTargetTypeMutator(param);
            var converted = mutator.Visit(node.Body);

            return Expression.Lambda(converted, node.Name, new[] { param });
        }

        private class ExpressionTargetTypeMutator : ExpressionVisitor
        {
            private readonly List<ParameterExpression> parameterExpressions;

            public ExpressionTargetTypeMutator(ParameterExpression parameterExpression)
            {
                parameterExpressions = new List<ParameterExpression> { parameterExpression };
            }

            protected override Expression VisitMethodCall(MethodCallExpression node)
            {
                if (!node.Method.IsStatic) return base.VisitMethodCall(node);

                var allArgs = Visit(node.Arguments);

                var method = typeof(Enumerable).GetMethods().FirstOrDefault(meth => meth.Name == node.Method.Name
                                                                                    && meth.GetParameters().Count() == node.Method.GetParameters().Count());

                if (method == null) return base.VisitMethodCall(node);

                var genericArgs = method.GetGenericArguments();
                MethodInfo methodInfo;

                if (genericArgs.Count() == 1)
                {
                    methodInfo = allArgs.Count > 1
                        ? method.MakeGenericMethod(GetParameterType(allArgs[1]))
                        : method.MakeGenericMethod(GetParameterType(allArgs[0]));
                }
                else
                {
                    var typeArgs = new Type[genericArgs.Count()];
                    typeArgs[0] = GetParameterType(allArgs[0]);

                    for (var i = 1; i < genericArgs.Count(); i++)
                    {
                        typeArgs[i] = GetParameterType(allArgs[i], true);
                    }
                    methodInfo = method.MakeGenericMethod(typeArgs);
                }

                var result = Expression.Call(null, methodInfo, allArgs);
                return result;
            }

            private static Type GetParameterType(Expression expression, bool getBaseType = false)
            {
                switch (expression.NodeType)
                {
                    case ExpressionType.Lambda:
                        var exp = (LambdaExpression)expression;
                        var baseType = getBaseType ? exp.Body.Type : exp.Parameters[0].Type;

                        if (baseType.IsGenericType && baseType.GetGenericTypeDefinition() == typeof(ICollection<>))
                            return baseType.GetGenericArguments()[0];

                        return baseType;
                    case ExpressionType.MemberAccess:
                        var mem = (MemberExpression)expression;
                        var memType = mem.Type;
                        if (memType.IsGenericType && memType.GetGenericTypeDefinition() == typeof(ICollection<>))
                            return memType.GetGenericArguments()[0];
                        return mem.Type;

                    default:
                        return expression.Type;
                }
            }

            private static Type GetObjectType(Type nodeType)
            {
                var matchingTypes = assembly.GetTypes().Where(t =>
                    t.GetInterfaces().Contains(nodeType) &&
                    t.GetConstructor(Type.EmptyTypes) != null).ToList();

                //because some object inherit other objects, and therefore, you can have 
                //multiple implementations of the same interface, get the base instance of the class
                //that matches the interface.
                if (matchingTypes.Any())
                {
                    if (matchingTypes.Count() == 1) return matchingTypes.First();
                    foreach (var type in matchingTypes)
                    {
                        if (matchingTypes.Any(b => b == type.BaseType)) return type.BaseType;
                    }
                }

                return nodeType;
            }

            protected override Expression VisitMember(MemberExpression node)
            {
                if (node.Expression == null) return base.VisitMember(node);
                if (node.Expression.NodeType == ExpressionType.Constant) return base.VisitMember(node);

                var visited = base.Visit(node.Expression);
                var activeProperty = GetObjectType(node.Member.ReflectedType).GetProperty(node.Member.Name);

                return visited.Type.IsInterface
                    ? base.VisitMember(node)
                    : Expression.MakeMemberAccess(visited, activeProperty);
            }

            protected override Expression VisitLambda<T>(Expression<T> node)
            {
                var activeRecordType = GetObjectType(node.Parameters[0].Type);
                return VisitInnerExpression(node, activeRecordType);
            }

            protected override Expression VisitParameter(ParameterExpression node)
            {
                var newParam = Expression.Parameter(GetObjectType(node.Type), node.Name);
                var param = parameterExpressions.SingleOrDefault(p => p.Type == newParam.Type);
                if (param != null) return param;

                parameterExpressions.Add(newParam);
                return newParam;
            }
        }

    }
}