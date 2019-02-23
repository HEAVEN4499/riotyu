import React from 'react';
import NavBar from '../components/NavBar';
import { connect } from 'dva';
import styles from './IndexPage.css';

function IndexPage() {
  return (
    <div>
      <NavBar />
    </div>
  );
}

IndexPage.propTypes = {
};

export default connect()(IndexPage);
