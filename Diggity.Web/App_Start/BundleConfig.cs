using System.Web.Optimization;

namespace Diggity.Web
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                "~/Scripts/vendors/jquery/jquery-{version}.js"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                "~/Scripts/vendors/modernizr/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                "~/Scripts/vendors/bootstrap/bootstrap.js",
                "~/Scripts/vendors/respond/respond.js"));

            bundles.Add(new ScriptBundle("~/bundles/angular").Include(
                "~/Scripts/vendors/angularjs/i18n/angular-locale_en_us.js",
                "~/Scripts/vendor/angularjs/angular.js",
                "~/Scripts/vendor/angularjs/angular-route.js",
                "~/Scripts/vendor/angularjs/angular-resource.js"));

            bundles.Add(new ScriptBundle("~/bundles/myApp").Include(
                "~/Scripts/app.js",
                "~/Scripts/config.js",
                "~/Scripts/directives.js",
                "~/Scripts/routes.js",
                "~/Scripts/filters.js"));

            bundles.Add(new ScriptBundle("~/bundles/myControllers").Include(
                "~/Scripts/controllers/exerciseTypeController.js",
                "~/Scripts/controllers/exerciseTypeEditController.js",
                "~/Scripts/controllers/unitOfMeasureController.js",
                "~/Scripts/Controllers/unitOfMeasureEditController.js"
                ));

            bundles.Add(new ScriptBundle("~/bundles/myServices").Include(
                "~/Scripts/services/exerciseTypeService.js",
                "~/Scripts/services/unitOfMeasureService.js"
                ));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                "~/Content/bootstrap.css",
                "~/Content/Site.css",
                "~/Content/font-awesome.css"));

            // Set EnableOptimizations to false for debugging. For more information,
            // visit http://go.microsoft.com/fwlink/?LinkId=301862
            BundleTable.EnableOptimizations = true;
        }
    }
}