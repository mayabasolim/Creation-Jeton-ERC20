import React from "react";

import {
  Card,
  CardHeader,
  ListGroup,
  ListGroupItem,
  Progress
} from "shards-react";



class UserDetails extends React.Component {

  userDetails= {
    name: this.props.userDetails[0],
    mail:this.props.userDetails[1],
    avatar: require("./../../images/avatars/0.jpg"),
    jobTitle: "Project Manager",
    account: this.props.account,
    balance:this.props.balance,
    performanceReportTitle: "Workload",
    performanceReportValue: 74,
    metaTitle: "Description",
    metaValue:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio eaque, quidem, commodi soluta qui quae minima obcaecati quod dolorum sint alias, possimus illum assumenda eligendi cumque?"
  }
    render() {

      return(
        <Card small className="mb-4 pt-3">
          <CardHeader className="border-bottom text-center">
            <div className="mb-3 mx-auto">
              <img
                className="rounded-circle"
                src={this.userDetails.avatar}
                alt={this.userDetails.name}
                width="110"
              />
            </div>
            <h4 className="mb-0">{this.userDetails.name}</h4>
            {/* span className="text-muted d-block mb-2">{this.userDetails.jobTitle}</span> */}
            <span className="text-muted d-block mb-2">{this.userDetails.mail}</span>
            <span className="text-muted d-block mb-2">{this.userDetails.account}</span>
            {/*<Button pill outline size="sm" className="mb-2">
              <i className="material-icons mr-1">person_add</i> Follow
            </Button>*/}
            <span className="text-muted d-block mb-2">{this.userDetails.balance} I3C</span>
          </CardHeader>
          {/*<ListGroup flush>
            <ListGroupItem className="px-4">
              <div className="progress-wrapper">
                <strong className="text-muted d-block mb-2">
                  {this.userDetails.performanceReportTitle}
                </strong>
                <Progress
                  className="progress-sm"
                  value={this.userDetails.performanceReportValue}
                >
                  <span className="progress-value">
                    {this.userDetails.performanceReportValue}%
                  </span>
                </Progress>
              </div>
            </ListGroupItem>
            <ListGroupItem className="p-4">
              <strong className="text-muted d-block mb-2">
                {this.userDetails.metaTitle}
              </strong>
              <span>{this.userDetails.metaValue}</span>
            </ListGroupItem>
          </ListGroup>*/}
        </Card>
      );
    }

};


export default UserDetails;
