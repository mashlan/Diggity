﻿using System.Web;
using System.Web.Optimization;

namespace Diggity.Web
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/vendors/jquery/jquery-{version}.js",
                        "~/Scripts/vendors/jquery/jquery-ui.multidatepicker.js"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/vendors/modernizr/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/vendors/bootstrap/bootstrap.js",
                      "~/Scripts/vendors/respond/respond.js",
                      "~/Scripts/vendors/bootstrap/general.js",
                      "~/Scripts/vendors/bootstrap/custom.js"));

            bundles.Add(new ScriptBundle("~/bundles/angular").Include(
                "~/Scripts/vendors/angularjs/i18n/angular-locale_en_us.js",
                "~/Scripts/vendor/angularjs/angular.js",
                "~/Scripts/vendor/angularjs/angular-route.js",
                "~/Scripts/vendor/angularjs/angular-resource.js"));

            bundles.Add(new ScriptBundle("~/bundler/MyApp").Include(
                "~/Scripts/app.js",
                "~/Scripts/config.js",
                "~/Scripts/controllers.js",
                "~/Scripts/directives.js",
                "~/Scripts/filters.js",
                "~/Scripts/services.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.css",
                      "~/Content/style.css",
                      "~/Content/font-awesome.css"));

            // Set EnableOptimizations to false for debugging. For more information,
            // visit http://go.microsoft.com/fwlink/?LinkId=301862
            BundleTable.EnableOptimizations = true;
        }
    }
}
