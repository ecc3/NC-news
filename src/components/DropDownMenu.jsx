import React from "react";
import Button from "./Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { Link } from "@reach/router";

export default function DropDownMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        primary
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        Articles
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <Link to="/articles">
          <MenuItem onClick={handleClose}>all topics</MenuItem>
        </Link>
        {props.topics.map(topic => {
          return (
            <Link to={`/topics/${topic.slug}`} key={topic.slug}>
              <MenuItem onClick={handleClose}>{topic.slug}</MenuItem>
            </Link>
          );
        })}
      </Menu>
    </div>
  );
}
