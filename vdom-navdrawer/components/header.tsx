import { h } from "preact";
import { useRef, useState, useEffect } from "preact/hooks";
import * as ResponsiveUtils from "ojs/ojresponsiveutils";
import "ojs/ojtoolbar";
import "ojs/ojmenu";
import "ojs/ojbutton";

// 1 ------------------------------------------------------------
import "ojs/ojnavigationlist";
import ArrayDataProvider = require("ojs/ojarraydataprovider");
import { ojNavigationList } from "ojs/ojnavigationlist";
// ------------------------------------------------------------

type Props = {
  appName: string,
  userLogin: string,
  // 2 ----------------- New Props
  page?: string;
  routes: Array<object>;
  onPageChanged: (value: string) => void;
};

// 3 Add routing props
type Route = {
  path: string;
  detail: object;
};

// 4 export function Header({ appName, userLogin }: Props) {

export function Header(props: Props) {

  const mediaQueryRef = useRef<MediaQueryList>(window.matchMedia(ResponsiveUtils.getFrameworkQuery("sm-only")!));
  const [isSmallWidth, setIsSmallWidth] = useState(mediaQueryRef.current.matches);
  useEffect(() => {
    mediaQueryRef.current.addEventListener("change", handleMediaQueryChange);
    return (() => mediaQueryRef.current.removeEventListener("change", handleMediaQueryChange));
  }, [mediaQueryRef]);
  function handleMediaQueryChange(e: MediaQueryListEvent) {
    setIsSmallWidth(e.matches);
  }
  function getDisplayType() {
    return (isSmallWidth ? "icons" : "all");
  };
  function getEndIconClass() {
    return (isSmallWidth ? "oj-icon demo-appheader-avatar" : "oj-component-icon oj-button-menu-dropdown-icon");
  }

  // 5 ------------------------------------------------------------------------------

  const [selectedPage, setSelectedPage] = useState<string>(
    props.page ? props.page : "dashboard"
  );

  const routesDP = new ArrayDataProvider(props.routes.slice(1), {
    keyAttributes: "path",
  });

  // You are saying that a function will be attached later
  // when this is actually used and prototype of the function is used here
  // Notice how the onPageChanged prop is triggering the function in app.tsx
  
  const pageChangeHandler = (
    event: ojNavigationList.selectionChanged<Route["path"], Route>
  ) => {
    props.onPageChanged(event.detail.value);
    console.log("Page changed -> ", event.detail.value)
  };

  const renderNavList = (item: ojNavigationList.ItemContext<string, Route>) => {
    return (
      <li id={item.data.path}>
        <a href="#">
          <span class={item.data.detail.iconClass} />
          {getDisplayType() === "all" ? item.data.detail.label : ""}
        </a>
      </li>
    );
  };
  // ------------------------------------------------------------------------------

  return (
    <header role="banner" class="oj-web-applayout-header">
      <div class="oj-web-applayout-max-width oj-flex-bar oj-sm-align-items-center">
        <div class="oj-flex-bar-middle oj-sm-align-items-baseline">
          <span
            role="img"
            class="oj-icon demo-oracle-icon"
            title="Oracle Logo"
            alt="Oracle Logo"></span>
          <h1
            class="oj-sm-only-hide oj-web-applayout-header-title"
            title="Application Name">
            {props.appName} {/*6*/}
          </h1>
        </div>
        <div class="oj-flex-bar-end">
        <oj-toolbar>
          <oj-menu-button id="userMenu" display={getDisplayType()} chroming="borderless">
            <span>{props.userLogin}</span> {/*7*/}
            <span slot="endIcon" class={getEndIconClass()}></span>
            <oj-menu id="menu1" slot="menu">
              <oj-option id="pref" value="pref">Preferences</oj-option>
              <oj-option id="help" value="help">Help</oj-option>
              <oj-option id="about" value="about">About</oj-option>
              <oj-option id="out" value="out">Sign Out</oj-option>
            </oj-menu>
          </oj-menu-button>
        </oj-toolbar>
        
        </div>
      </div>
      {/*8 Add the navigation bar*/}

      <div class="oj-flex-bar-end">

          <div
            role="navigation"
            class="oj-web-applayout-max-width oj-web-applayout-navbar">

            <oj-navigation-list
              selection={props.page}
              edge="top"
              id="navilist1"
              aria-label="Main navigation, select a page"
              onselectionChanged={pageChangeHandler}
              drillMode="none"
              data={routesDP}>
              <template slot="itemTemplate" render={renderNavList} />
            </oj-navigation-list>

          </div>

      </div>
    </header>
    
  );  
}
