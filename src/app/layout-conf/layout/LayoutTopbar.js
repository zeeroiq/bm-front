import React, { Component } from "react";
import { Icon, IconButton, MenuItem } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { CustomMenu, CustomSearchBox } from "./../../../custom-components";
import NotificationBar from "../shared-components/NotificationBar";
import { isMdScreen, classList } from "util";
import { connect } from "react-redux";
import { setLayoutSettings } from "./../../redux/actions/LayoutActions";
import { Link } from "react-router-dom";
import { logoutUser } from "./../../redux/actions/UserActions";
import { withRouter } from "react-router-dom";

const styles = theme => ({
    topbar: {
        "& .topbar-hold": {
            backgroundColor: theme.palette.primary.main,
            height: "80px",
            "&.fixed": {
                boxShadow: theme.shadows[8],
                height: "64px"
            }
        }
    },
    menuItem: {
        display: "flex",
        alignItems: "center",
        minWidth: 185
    }
});


class LayoutTopbar extends Component {

    state = {};
    updateSidebarMode = sidebarSettings => {
        let { settings, setLayoutSettings } = this.props;

        setLayoutSettings({
            ...settings,
            layoutSettings: {
                ...settings.layoutSettings,
                leftSidebar: {
                    ...settings.layoutSettings.leftSidebar,
                    ...sidebarSettings
                }
            }
        });
    };

    handleSidebarToggle = () => {
        let { settings } = this.props;
        let { layoutSettings } = settings;

        let mode = isMdScreen() 
                ? (layoutSettings.leftSidebar.mode === "close" ? "mobile" : "close")
                : (layoutSettings.leftSidebar.mode === "full" ? "close" : "full");

        this.updateSidebarMode({ mode });
    };

    // todo: need to configure login/logout option
    handleSignOut = () => {
        this.props.logoutUser();
    }

    render() {
        let { classes, fixed } = this.props;

        return (
            <div className={`topbar ${classes.topbar}`}>
                <div className={classList({"topbar-hold" : true, fixed: fixed})}>
                    <div className="flex justify-between items-center h-full">
                        <div className="flex">
                            <IconButton onClick={this.handleSidebarToggle} className="hide-on-pc">
                                <Icon>menu</Icon>
                            </IconButton>

                            <div className="hide-on-mobile">
                                <IconButton>
                                    <Icon>mail_outline</Icon>
                                </IconButton>

                                <IconButton>
                                    <Icon>web_asset</Icon>
                                </IconButton>
                                
                                <IconButton>
                                    <Icon>star_outline</Icon>
                                </IconButton>
                            </div>
                        </div>
                        <div className="flex item-center">
                            <CustomSearchBox />
                            <NotificationBar />
                            {/* todo check for below opttion: only for experimental purpose */}
                            {/* <ShoppingCart></ShoppingCart> */}
                            <CustomMenu menuButton={
                                <img className="mx-2 align-middle circular-image-small cursor-pointer"
                                src="/assets/images/face-6.jpg"
                                alt="user"
                                />
                            }>
                                <MenuItem>
                                    <Link className={classes.menuItem} to="/">
                                        <Icon> home </Icon>
                                        <span className="pl-4"> Home </span>
                                    </Link>
                                </MenuItem>

                                <MenuItem>
                                    <Icon> person </Icon>
                                    <span className="pl-4"> Profile </span>
                                </MenuItem>

                                <MenuItem className={classes.menuItem}>
                                    <Icon> settings </Icon>
                                    <span className="pl-4"> Settings </span>
                                </MenuItem>

                                {/* todo: handling for signout option */}
                                <MenuItem onclick={this.handleSignOut} 
                                            className={classes.menuItem}
                                            >
                                    <Icon> power_setting_new </Icon>
                                    <span className="pl-4"> Logout </span>
                                </MenuItem>
                            </CustomMenu>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
 }


LayoutTopbar.propTypes = {
    setLayoutSettings: PropTypes.func.isRequired,
    logoutUser: PropTypes.func.isRequired,
    settings: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    setLayoutSettings: PropTypes.func.isRequired,
    logoutUser: PropTypes.func.isRequired,
    settings: state.layout.settings
});

export default withStyles(styles, { withThem: true })(
    withRouter(
        connect(mapStateToProps, { setLayoutSettings, logoutUser }) (LayoutTopbar)
    )
);