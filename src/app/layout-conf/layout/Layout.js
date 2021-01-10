import React, { useContext } from "react";
import PropTypes from "prop-types";
import { withStyles, ThemeProvider } from "@material-ui/core/styles";
import Scrollbar from "react-perfect-scrollbar";
import AppContext from "./../../appContext";
import LayoutSidenav from "./LayoutSidenav";
import LayoutTopbar from "./LayoutTopbar"
import SecondarySidebar from "./../shared-components/SecondarySidebar/SecondarySidebar";
import Footer from "./../shared-components/Footer";
import { classList } from "util";
import { connect } from "react-redux";
import { setLayoutSettings } from "./../../redux/actions/LayoutActions";

const styles = theme => {
    return {
        layout: {
            backgroundColor: theme.palette.background.default
        }
    };
};

const Layout = props => {
    const { routes } = useContext(AppContext);
    let { settings, classes, theme } = props;
    let { layoutSettings } = settings;
    const topbarTheme = settings.themes[layoutSettings.toolbar.theme];
    let layoutClasses = {
        [classes.layout]: true,
        [`${settings.activeLayout} sidenav-${layoutSettings.leftSidebar.mode} theme-${theme.palette.type} flex`]: true,
        "topbar-fixed": layoutSettings.topbar.fixed
    };

    return (
        <div className={classList(layoutClasses)}>
            {layoutSettings.leftSidebar.show && <LayoutSidenav />}

            <div className="content-wrap position-relative">
                {layoutSettings.topbar.show && layoutSettings.topbar.fixed && (
                    <ThemeProvider theme={topbarTheme}>
                        <LayoutTopbar fixed={true} className="elevation-z8" />
                    </ThemeProvider>
                )}

                {settings.perfectScrollbar && (
                    <Scrollbar className="scrollbar-content">
                        {layoutSettings.topbar.show && !layoutSettings.topbar.fixed && (
                            <ThemeProvider theme={topbarTheme}>
                                <LayoutTopbar />
                            </ThemeProvider>
                        )}
                        {/* <div className="content">
                            configuration to routes 
                        </div> */}
                        <div className="auto" />
                        {settings.footer.show && !settings.footer.fixed && <Footer />}
                    </Scrollbar>
                )}

                {settings.perfectScrollbar && (
                    <div className="scrollable-content">
                        {layoutSettings.topbar.show && !layoutSettings.topbar.fixed && (
                            <LayoutTopbar />
                        )}
                        {/* <div className="content">
                            configuration to routes
                        </div> */}
                        <div className="auto" />
                        {settings.footer.show && !settings.footer.fixed && <Footer />}
                    </div>
                )}
                
                {settings.footer.show && settings.footer.fixed && <Footer />}
            </div>
            {settings.secondarySidebar.show && <SecondarySidebar />}
        </div>
    );
};

Layout.propTypes = {
    settings: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    setLayoutSettings: PropTypes.func.isRequired,
    settings: state.layout.settings
});

export default withStyles(styles, {withTheme: true})(
    connect(mapStateToProps, { setLayoutSettings })(Layout)
);