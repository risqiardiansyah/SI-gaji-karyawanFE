import { Button, CircularProgress } from "@material-ui/core";
import { checkToken } from "app/redux/actions/UserActions";
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class CheckToken extends Component {
  componentDidMount() {
    this.processToken();
  }
  processToken = async () => {
    const { token } = this.props.match.params;
    const { checkToken } = this.props;
    if (token) {
      await localStorage.clear();
      checkToken(token);
    }
  };
  render() {
    const { dataCheckToken } = this.props;
    return (
      <div className="w-full h-full flex items-center justify-center flex-column">
        {dataCheckToken.loading ? (
          <Fragment>
            <CircularProgress color="primary" size={25} />
            <p className="m-0">Loading...</p>
          </Fragment>
        ) : dataCheckToken.success ? (
          <Fragment>
            <p className="m-0 mb-2">Login berhasil</p>
            {/* <Link to="/dashboard"> */}
            <Link to="/invoice">
              <Button variant="contained" color="primary">
                Ke dashboard
              </Button>
            </Link>
          </Fragment>
        ) : dataCheckToken.error ? (
          <Fragment>
            <img
              src="/assets/images/illustrations/logo-w-ilustration.svg"
              alt="login first"
              className="mb-4"
              style={{ width: 300 }}
            />
            <p className="m-0 mb-3 text-error font-medium">Token Tidak Valid</p>
            <Button
              href="https://office.alan.co.id/"
              variant="contained"
              color="primary"
            >
              Login Ulang
            </Button>
          </Fragment>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    dataCheckToken: state.checkToken,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    checkToken: (token) => dispatch(checkToken(token)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CheckToken);
