import moment from "moment";
import { Modal } from "antd";
import * as turf from '@turf/turf';
import { message } from 'antd';

const { confirm } = Modal;

/**
 * converts ISO date string to human readable
 * date and time
 *
 * @function
 * @name isoDateToHumanReadableDate
 *
 * @param {string} isoFormattDate
 *
 * @returns {string} human readable date
 * @version 0.1.0
 * @since 0.1.0
 */
export const isoDateToHumanReadableDate = (isoFormattDate) => {
  return moment(isoFormattDate).utc().format("MMM Do YYYY");
};

/**
 * converts moment date  object to date string
 *
 * @function
 * @name generateDateString
 *
 * @param {Object} dateObject
 *
 * @returns {string} date string
 * @version 0.1.0
 * @since 0.1.0
 */
export const generateDateString = (dateObject) => {
  return moment(dateObject).utc().format("YYYY-MM-DD");
};

/**
 * converts moment date  object to date string
 *
 * @function
 * @name generateYearString
 *
 * @param {Object} dateObject
 *
 * @returns {string} date string
 * @version 0.1.0
 * @since 0.1.0
 */
export const generateYearString = (dateObject) => {
  return moment(dateObject).utc().format("YYYY");
};

/**
 * create moment date  object from ISO string
 *
 * @function
 * @name createDateFromString
 *
 * @param {String} dateString
 *
 * @returns {Object} date
 * @version 0.1.0
 * @since 0.1.0
 */
export const createDateFromString = (dateString) => {
  return moment(dateString);
};

/**
 * get Geojson Object from an  location object
 *
 * @function
 * @name getGeoJsonFromLocation
 *
 * @param {Object} data
 *
 * @returns {Object}
 * @version 0.1.0
 * @since 0.1.0
 */
export const getGeoJsonFromLocation = (data) => {
  const { location } = data;
  if (location.level === "district") {
    const districtGeo = location?.district?.geo_json;
    const property = { level: location.level, id: location?.district.id };
    return { ...districtGeo, property };
  } else {
    const regionGeo = location?.region?.geo_json;
    const property = { level: location.level, id: location?.region.id };
    return { ...regionGeo, property };
  }
};

/**
 * get selected resources by level and geospatial id
 *
 * @function
 * @name getSelectedResources
 *
 * @param {string} level
 * @param {string} id
 * @param {Array} resources
 *
 * @returns {Object}
 * @version 0.1.0
 * @since 0.1.0
 */
export const getSelectedResources = (level, id, resources) => {
  if (level === "district") {
    return resources.filter(({ location }) => location?.district.id === id);
  } else {
    return resources.filter(({ location }) => location?.region.id === id);
  }
};

/**
 * @function
 * @name makeActionCreator
 * @description generates action creator function
 * @param {String} type action type
 * @param {String} argNames properties applicable to action object
 */
export function makeActionCreator(type, ...argNames) {
  return function (...args) {
    const action = { type };
    argNames.forEach((arg, index) => {
      action[argNames[index]] = args[index];
    });
    return action;
  };
}

/**
 * @function
 * @name generateColor
 * @description generates based on a number
 * @param {Number} num
 * @returns {String} color
 */
export const generateColor = (num) => {
  switch (num) {
    case 0:
      return "#97bffa";
    case 1:
      return "#7da5e0";
    case 2:
      return "#638bc6";
    case 3:
      return "#4971ac";
    case 4:
      return "#2f5792";
    case 5:
      return "#153d78";
    case 6:
      return "#BD0026";
    case 7:
      return "#800026";
    default:
      return "#800026";
  }
};

/**
 * @function
 * @name generateNumberRange
 * @description generates number range based on a number
 * @param {Number} num
 * @returns {Array} array of integers
 */
export const generateNumberRange = (num) => {
  const digitsCount = String(num).length;
  let factorString = 1 + "";

  while (factorString.length < digitsCount) {
    factorString = factorString + "0";
  }
  let factor = parseInt(factorString);

  return [0, 1, 3, 5, 7, 9].map((n) => n * factor);
};

/**
 * @function
 * @name moneyFormat
 * @description generates number range based on a number
 * @param {Number} labelValue
 * @returns {String} rounded up number
 */
export const moneyFormat = (labelValue) => {
  // Nine Zeroes for Billions
  return Math.abs(Number(labelValue)) >= 1.0e9
    ? Math.abs(Number(labelValue)) / 1.0e9 + "B"
    : // Six Zeroes for Millions
    Math.abs(Number(labelValue)) >= 1.0e6
    ? Math.abs(Number(labelValue)) / 1.0e6 + "M"
    : // Three Zeroes for Thousands
    Math.abs(Number(labelValue)) >= 1.0e3
    ? Math.abs(Number(labelValue)) / 1.0e3 + "K"
    : Math.abs(Number(labelValue));
};

/**
 * @function
 * @name moneyFormatWithApproximation
 * @description generates number range based on a number
 * @param {Number} labelValue
 * @returns {String} rounded up number
 */
export const moneyFormatWithApproximation = (labelValue) => {
  // Nine Zeroes for Billions
  return Math.abs(Number(labelValue)) >= 1.0e9
    ? Number.parseFloat(Math.abs(Number(labelValue)) / 1.0e9).toPrecision(3) +
        "B"
    : // Six Zeroes for Millions
    Math.abs(Number(labelValue)) >= 1.0e6
    ? Number.parseFloat(Math.abs(Number(labelValue)) / 1.0e6).toPrecision(3) +
      "M"
    : // Three Zeroes for Thousands
    Math.abs(Number(labelValue)) >= 1.0e3
    ? Number.parseFloat(Math.abs(Number(labelValue)) / 1.0e3).toPrecision(3) +
      "K"
    : Number.parseFloat(Math.abs(Number(labelValue))).toPrecision(3);
};

/**
 * @function
 * @name chunkIntoSmallerArrays
 * @description chunk bigger array into smaller arrays
 * @param {Array} arr array to be chunked
 * @param {Number} size size of array chunks
 * @returns {Array} array of chunked arrays
 */
export const chunkIntoSmallerArrays = (arr, size) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
    arr.slice(i * size, i * size + size)
  );

/**
 * @function
 * @name getSurveyIdByCategory
 * @description gets  kobotoolbox  survey id based  on category name
 * @param {String} categoryName survey category name
 * @param {Array} surveys list of surveys
 * @returns {String} survey id
 */
export const getSurveyIdByCategory = (categoryName, surveys = []) => {
  const filteredSurveys = surveys.filter(
    ({ category_name }) => categoryName === category_name
  );
  return filteredSurveys.length > 0 ? filteredSurveys[0].survey_id : null;
};

/**
 * @function
 * @name checkForPermission
 * @description checks if a permission is included in the array of permissions
 * @param {String} permission a permission to be checked
 * @param {Array} permissions list of permissions
 * @returns {Boolean}
 */
export const checkForPermission = (permissions, permission) => {
  if (permissions.length > 0) {
    const permissionName = permissions.map(({ name }) => name);
    return permissionName.includes(permission);
  } else {
    return false;
  }
};


/**
 * @function
 * @name getRandomPointFromGeojson
 * @description gets a random point from a geojson
 * @param {Object} geoJSON 
 * @returns {Object} geoJSON point
 */
 export const getRandomPointFromGeojson = (geoJSON) => {
 const {features} = turf.explode(geoJSON);
 return features.sort(() => 0.5 - Math.random())[0];
 }


/**
 * @function
 * @name stringToGeoJson
 * @description converts string to geojson
 * @param {String} str spatial data
 * @param {String} spatialType spatial data type
 * @returns {Object} Geojson
 */
export const stringToGeoJson = (str, spatialType) => {
  if (!str) return;
  const words = str.split(";");

  if (spatialType === "geoshape") {
    const data = words.splice(0, words.length - 1);

    const coordinates = data.map((c) => c.split(" "));

    const stringToInts = coordinates.map((arr) => {
      const latLongArrString = arr.slice(0, 2).reverse();

      return latLongArrString.map((v) => parseFloat(v));
    });

    return {
      type: "Feature",
      properties: {},
      geometry: {
        type: "LineString",
        coordinates: stringToInts,
      },
    };
  } else if (spatialType === "geotrace") {
    const coordinates = words.map((c) => c.split(" "));

    const strintToInts = coordinates.map((arr) => {
      const latLongArrString = arr.slice(0, 2).reverse();

      return latLongArrString.map((v) => parseFloat(v));
    });

    return {
      type: "Feature",
      properties: {},
      geometry: {
        type: "LineString",
        coordinates: strintToInts,
      },
    };
  } else {
    const coordinates = words.map((c) => c.split(" "));

    const strintToInts = coordinates.map((arr) => {
      const latLongArrString = arr.slice(0, 2).reverse();

      return latLongArrString.map((v) => parseFloat(v));
    });

    return {
      type: "Feature",
      properties: {},
      geometry: {
        type: "Point",
        coordinates: strintToInts.flat(),
      },
    };
  }
};

export function invertColor(hex, bw = true) {
  if (hex.indexOf("#") === 0) {
    hex = hex.slice(1);
  }
  // convert 3-digit hex to 6-digits.
  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }
  if (hex.length !== 6) {
    throw new Error("Invalid HEX color.");
  }
  var r = parseInt(hex.slice(0, 2), 16),
    g = parseInt(hex.slice(2, 4), 16),
    b = parseInt(hex.slice(4, 6), 16);
  if (bw) {
    // http://stackoverflow.com/a/3943023/112731
    return r * 0.299 + g * 0.587 + b * 0.114 > 186 ? "#000000" : "#FFFFFF";
  }
  // invert color components
  r = (255 - r).toString(16);
  g = (255 - g).toString(16);
  b = (255 - b).toString(16);
  // pad each with zeros and return
  return "#" + padZero(r) + padZero(g) + padZero(b);
}

function padZero(str, len) {
  len = len || 2;
  var zeros = new Array(len).join("0");
  return (zeros + str).slice(-len);
}

/**
 * @function
 * @name showArchiveConfirm
 * @description show confirm modal before archiving a Event Initiative
 * @param {object} item Resource item to be archived
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export const showArchiveConfirm = (item, deleteContent) => {
  confirm({
    title: `Are you sure you want to archive this record ?`,
    okText: "Yes",
    okType: "danger",
    cancelText: "No",
    onOk() {
      deleteContent(item.id);
    },
  });
};

/**
 * @function
 * @name getIdFromUrlPath
 * @description take path of the url and returns the id param
 * @param {string} path url path
 * @param {index} expected index of id param when url is split into array
 *
 * @returns {any} id param of the url
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export const getIdFromUrlPath = (path, index) => {
  const urlPathParts = path.split("/");
  return urlPathParts[index];
};

export const getAmount = (data) => {
  const { amount, currency } = data;
  const money = moneyFormat(amount);
  return `${money} ${currency} `;
};


/**
 * @function
 * @name notifyError
 * @description Show error message box
 *
 * @param {object} error  error object
 * @returns {undefined} undefined
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export const notifyError = error => {
  // eslint-disable-next-line
  if (!navigator.onLine) {
    return message.error(
      'You are currently offline, Please ensure Network connection is available'
    );
  }

  return message.error(error);
};

/**
 * @function
 * @name notifySuccess
 * @description Show a success message box
 *
 * @param {string} details information to be displayed on message box
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export const notifySuccess = details => {
  message.success(details);
};

/**
 * @function
 * @name notifyInfo
 * @description Show a info message box
 *
 * @param {string} info information to be displayed on message box
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export const notifyInfo = info => {
  message.info(info);
};

/**
 * @function
 * @name formatTime
 * @description formats date to ddd, MMM DD YYYY hA format
 *
 * @param {object} date date object
 * @returns {string} formatted date
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export const formatTime = date => moment(date).format('ddd, MMM DD YYYY hA');

/**
 * @function
 * @name timeAgo
 * @description creates relative date
 *
 * @param {object} date date object
 * @returns {string} relative time
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export const timeAgo = date => moment(date).fromNow();

/**
 * @function
 * @name formatNumber
 * @description Format number to en-Us format i.e 2000 to 2,000
 *
 * @param {number|string} number Number to be formatted
 *
 * @returns {string} formatted number
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export const formatNumber = number =>
  new Intl.NumberFormat('en-US').format(number);

/**
 * @function
 * @name getRGBAColor
 * @description Return RGBA color from base color and alpha value
 *
 * @param {string} baseColor  Base color i.e #ffddee
 * @param {number} alpha Alpha value should be between 0 and 1
 *
 * @returns {string} rbga(r,b,g,a)
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export const getRGBAColor = (baseColor, alpha) => {
  const values = baseColor.split('');

  if (values.length < 7 || alpha > 1 || alpha < 0) {
    return undefined;
  }

  const r = parseInt(`0x${values[1]}${values[2]}`, 16);
  const g = parseInt(`0x${values[3]}${values[4]}`, 16);
  const b = parseInt(`0x${values[5]}${values[6]}`, 16);

  return `rgba(${r},${g},${b},${alpha})`;
};

/**
 * @function
 * @name truncateString
 * @description truncates string
 * @param {string} str  string to truncate
 * @param {number} num number of characters to not exceed
 * @returns {string} truncated string
 * @version 0.1.0
 * @since 0.1.0
 */
export const truncateString = (str, num) => {
  // If the length of str is less than or equal to num
  // just return str--don't truncate it.
  if (str.length <= num) {
    return str;
  }
  // Return str truncated with '...' concatenated to the end of str.
  return `${str.slice(0, num)}...`;
};
