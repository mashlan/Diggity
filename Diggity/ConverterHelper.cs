using System;

namespace Diggity
{
    public static class ConverterHelper
    {
        public static TModel ConvertToModel<TEntity, TModel, TInterface>(this TEntity entity, TModel model) 
            where TEntity: TInterface
            where TModel: TInterface
        {
            try
            {
                var pInfo = typeof (TInterface).GetProperties();
                foreach (var prop in pInfo) prop.SetValue(model, prop.GetValue(entity));
                return model;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
