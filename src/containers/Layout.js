import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import CircularProgress from '@material-ui/core/CircularProgress';

import '../assets/scss/App.scss';
import logo from '../assets/images/logo.png';
import icoVideoCamera from '../assets/images/icons/ico-video-camera.svg';
import icoAudio from '../assets/images/icons/ico-audio.svg';
import icoUpload from '../assets/images/icons/ico-upload.svg';
import icoHired from '../assets/images/icons/ico-hired.svg';
import icoMembership from '../assets/images/icons/ico-membership.svg';

const menu = [
  {
    title: 'VIDEOS',
    image: icoVideoCamera,
    link: '/videos',
  },
  {
    title: 'AUDIOS',
    image: icoAudio,
    link: '/audios',
  },
  {
    title: 'UPLOAD',
    image: icoUpload,
    link: '/upload',
  },
  {
    title: 'MEMBERS',
    image: icoHired,
    link: '/members',
  },
  {
    title: 'MEMBERSHIPS',
    image: icoMembership,
    link: '/memberships',
  },
];

function Layout(props) {
  const { component, location, loading, uploadProgress } = props;

  return (
    <>
      <div className="top-bar-wrapper">
        <Grid container className="top-bar">
          <Grid className="logo-wrapper" item xs={3}>
            <Link to="/">
              <img src={logo} alt="" />
            </Link>
          </Grid>
          <Grid item xs={9} className="top-title">
            <h1>App Name</h1>
          </Grid>
        </Grid>
      </div>
      <div className="content-wrapper">
        <Grid container>
          <Grid className="navbar" item xs={3}>
            {menu.map(item => (
              <Link
                to={item.link}
                key={item.title}
                className={
                  location.pathname.replace(/\//g, '') === item.link.replace(/\//g, '')
                    ? 'active menu-item'
                    : 'menu-item'
                }
              >
                <div className="ico-wrapper">
                  <img src={item.image} alt="" />
                </div>
                {item.title}
              </Link>
            ))}
          </Grid>
          <Grid className="content-block" item xs={9}>
            <div className="content-inner-block">{component}</div>
          </Grid>
        </Grid>
      </div>
      {loading ? (
        <div className="loading-block">
          <CircularProgress className="form-spinner" />
          Loading
        </div>
      ) : null}

      {uploadProgress > 0 ? (
        <div className="progressbar-block">
          <LinearProgress variant="determinate" value={uploadProgress} />
        </div>
      ) : null}
    </>
  );
}

Layout.propTypes = {
  loading: PropTypes.bool,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }),
  component: PropTypes.shape({}),
  uploadProgress: PropTypes.number,
};

Layout.defaultProps = {
  loading: undefined,
  location: undefined,
  component: undefined,
  uploadProgress: undefined,
};

const mapStateToProps = state => ({
  loading: state.loading,
  uploadProgress: state.uploadProgress,
});

export default withRouter(connect(mapStateToProps)(Layout));
