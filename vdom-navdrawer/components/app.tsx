import { registerCustomElement } from "ojs/ojvcomponent";
import { h } from "preact";
import { useEffect, useState } from "preact/hooks";
import Context = require("ojs/ojcontext");
import { Footer } from "./footer";
import { Header } from "./header";
import { Content } from "./content/index";

// 1 --------------------------------------
import CoreRouter = require("ojs/ojcorerouter");
import UrlParamAdapter = require("ojs/ojurlparamadapter");

// 1A Change ReadOnly
type Props = {
  appName: string;
  userLogin: string;
};

// 2 -------------------------------------
type Route = {
  path: string;
  detail?: object;
  redirect?: string;
};

// 3 Route Array ----------------------

const routeArray: Array<Route> = [
  { path: "", redirect: "dashboard" },
  {
    path: "dashboard",
    detail: {
      label: "Dashboard",
      iconClass: "oj-navigationlist-item-icon oj-ux-ico-binding-control",
    },
  },
  {
    path: "customers",
    detail: {
      label: "Customers",
      iconClass: "oj-navigationlist-item-icon oj-ux-ico-ungroup",
    },
  },
  {
    path: "incidents",
    detail: {
      label: "Incidents",
      iconClass:
        "oj-navigationlist-item-icon oj-ux-ico-instructor-training-plus",
    },
  },
  {
    path: "about",
    detail: {
      label: "About",
      iconClass:
        "oj-navigationlist-item-icon oj-ux-ico-instructor-training-plus",
    },
  },
];

// 4 Creating router object and also the pageChangeHandler -------

const router = new CoreRouter<CoreRouter.DetailedRouteConfig>(routeArray, {
  urlAdapter: new UrlParamAdapter(),
});

const pageChangeHandler = (value: string) => {
  router.go({ path: value });
};

export const App = registerCustomElement(
  "app-root",
  (props: Props) => { /* 5 change to props */
    useEffect(() => {
      Context.getPageContext().getBusyContext().applicationBootstrapComplete();
      // 9 after you see the router not getting updated
      router.currentState.subscribe(routerUpdated);
      router.sync();
    }, []);

    // 6 Define soome props
    props.appName = "VDOM Training";
    props.userLogin = "some.person@oracle.com";
    const [routePath, setRoutePath] = useState<string>("");

    // 7 Router update handler
    const routerUpdated = (
      actionable: CoreRouter.ActionableState<CoreRouter.DetailedRouteConfig>
    ): void => {
      // Update our state based on new router state
      const newPath = actionable.state?.path;
      setRoutePath(newPath);
    };
    
    return (
      <div id="appContainer" class="oj-web-applayout-page">
        {/* 8 Update Header and Content props*/ }
        <Header
          appName={props.appName} 
          userLogin={props.userLogin} 
          page={routePath}
          onPageChanged={pageChangeHandler}
          routes={routeArray}
        />
        <Content page={routePath}/>
        <Footer />
      </div>
    );
  }
);
