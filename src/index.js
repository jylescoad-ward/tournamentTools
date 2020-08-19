import _ from 'lodash';
import $ from 'jquery';

/* Import Custom CSS Styles */
var styles = [];
require(`./css/console.css`);
styles.forEach(async (s) => { s.use(); })


console.log(`[DocPathName] ${document.location.pathname}`);
