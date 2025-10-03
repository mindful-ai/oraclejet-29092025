import { h } from "preact";

import { IncidentsContent } from "./incidents/index";
import { DashboardContent } from "./dashboard/index";
import { CustomersContent } from "./customers/index";
import { AboutContent } from "./about/index";

type Props = {
    page: string;
};

export function Content(props: Props){

    let pageContent = (page:string) => {
        switch (page) {
          case "dashboard":
            return <DashboardContent />;
          case "incidents":
            return <IncidentsContent />;
          case "customers":
            return <CustomersContent />;
          default:
            return <AboutContent />;
        }
      };

    return(
        <div>
            <h1>Single Page Application</h1>
            <div class="oj-web-applayout-max-width oj-web-applayout-content">
                {pageContent(props.page as string)}
            </div>
        </div>
    )
}