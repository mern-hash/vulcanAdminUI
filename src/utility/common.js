import { AcceptFileType,AuthStatus,CommonConstant } from './constant'
import queryString from 'query-string'
import { v4 as uuidv4 } from 'uuid'
import { Decimal } from 'decimal.js';
import { isValidPhoneNumber } from 'libphonenumber-js';

export class CommonUtility {
  static currencyFormat(value,currency) {
    if (Number.isNaN(value || 0)) {
      return value
    }

    return new Intl.NumberFormat('en-US',{
      style: 'currency',
      currency: currency || 'USD',
    }).format(value || 0)
  }

  static isNotEmpty(item) {
    return (
      item !== undefined && item !== null && item !== '' && item.length !== 0
    )
  }

  static truncateString(text,ellipsisString) {
    return (text || '').length > ellipsisString
      ? `${text.substring(0,ellipsisString)}...`
      : text
  }

  static numberWithCommas(x) {
    return x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g,',')
  }

  static objectToParams(obj) {
    const str = queryString.stringify(obj)
    return str
  }

  static toTitleCase(phrase) {
    return (phrase || '')
      .toLowerCase()
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }

  static timeoutPromise(ms) {
    return new Promise((resolve) => setTimeout(resolve,ms))
  }

  static roundNumber(num,decimals = 2) {
    if (!CommonUtility.isNotEmpty(num)) {
      return ''
    }
    const t = 10 ** decimals
    let result = Math.round((+num + Number.EPSILON) * t) / t
    if (num < 0) {
      result *= -1
    }
    return result
  }

  static isFileImageVideo = (file) => {
    return file.type.indexOf('image') > -1 || file.type.indexOf('video') > -1
  }

  static isFileImage = (file) => {
    return file.type.indexOf('image') > -1
  }

  static isFileVideo = (file) => {
    return file?.type?.indexOf('video') > -1
  }

  static isURLImageVideo = (url) => {
    const types = AcceptFileType.imageVideo['image/*']
    return types.some((x) => url.includes(x))
  }

  static isFile = (file) => {
    return file?.type?.indexOf('application/pdf') > -1
  }

  static isURLFile = (url) => {
    const types = AcceptFileType.application['application/*']
    return types.some((x) => url?.includes(x))
  }

  static isURLVideo = (url) => {
    const types = AcceptFileType.video['video/*']
    return types.some((x) => url?.includes(x))
  }

  static isURLImage = (url) => {
    const types = AcceptFileType.image['image/*']
    return types.some((x) => (url || "").toLowerCase()?.includes(x))
  }

  static extractFileName = (fullPath) => fullPath.replace(/^.*[/]/,'')

  static getInitials = (name) => {
    const temp = name.split(' ')
    let initials = temp[0].substring(0,1).toUpperCase()

    if (temp.length > 1) {
      initials += temp[temp.length - 1].substring(0,1).toUpperCase()
    }
    return initials
  }

  static formatBytes = (bytes,decimals = 2) => {
    if (!+bytes) return '0 Bytes'

    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['Bytes','KB','MB','GB','TB','PB','EB','ZB','YB']

    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return `${parseFloat((bytes / k ** i).toFixed(dm))} ${sizes[i]}`
  }

  static uuid = () => uuidv4()

  static getStatesByCode = () => {

    return [
      { name: "Alabama",isoCode: "AL" },
      { name: "Alaska",isoCode: "AK" },
      { name: "Arizona",isoCode: "AZ" },
      { name: "Arkansas",isoCode: "AR" },
      { name: "California",isoCode: "CA" },
      { name: "Colorado",isoCode: "CO" },
      { name: "Connecticut",isoCode: "CT" },
      { name: "Delaware",isoCode: "DE" },
      { name: "District of Columbia",isoCode: "DC" },
      { name: "Florida",isoCode: "FL" },
      { name: "Georgia",isoCode: "GA" },
      { name: "Hawaii",isoCode: "HI" },
      { name: "Idaho",isoCode: "ID" },
      { name: "Illinois",isoCode: "IL" },
      { name: "Indiana",isoCode: "IN" },
      { name: "Iowa",isoCode: "IA" },
      { name: "Kansa",isoCode: "KS" },
      { name: "Kentucky",isoCode: "KY" },
      { name: "Lousiana",isoCode: "LA" },
      { name: "Maine",isoCode: "ME" },
      { name: "Maryland",isoCode: "MD" },
      { name: "Massachusetts",isoCode: "MA" },
      { name: "Michigan",isoCode: "MI" },
      { name: "Minnesota",isoCode: "MN" },
      { name: "Mississippi",isoCode: "MS" },
      { name: "Missouri",isoCode: "MO" },
      { name: "Montana",isoCode: "MT" },
      { name: "Nebraska",isoCode: "NE" },
      { name: "Nevada",isoCode: "NV" },
      { name: "New Hampshire",isoCode: "NH" },
      { name: "New Jersey",isoCode: "NJ" },
      { name: "New Mexico",isoCode: "NM" },
      { name: "New York",isoCode: "NY" },
      { name: "North Carolina",isoCode: "NC" },
      { name: "North Dakota",isoCode: "ND" },
      { name: "Ohio",isoCode: "OH" },
      { name: "Oklahoma",isoCode: "OK" },
      { name: "Oregon",isoCode: "OR" },
      { name: "Pennsylvania",isoCode: "PA" },
      { name: "Rhode Island",isoCode: "RI" },
      { name: "South Carolina",isoCode: "SC" },
      { name: "South Dakota",isoCode: "SD" },
      { name: "Tennessee",isoCode: "TN" },
      { name: "Texas",isoCode: "TX" },
      { name: "Utah",isoCode: "UT" },
      { name: "Vermont",isoCode: "VT" },
      { name: "Virginia",isoCode: "VA" },
      { name: "Washington",isoCode: "WA" },
      { name: "West Virginia",isoCode: "WV" },
      { name: "Wisconsin",isoCode: "WI" },
      { name: "Wyoming",isoCode: "WY" },
    ]
  }

  static getAPISort = (sort) => {
    if (!sort) {
      return ""
    }
    if (sort === CommonConstant.tableSortDirection.ascending) {
      return CommonConstant.sortDirection.ascending
    }
    return CommonConstant.sortDirection.descending
  }

  static isUserLoggedIn = (authStatus) => authStatus === AuthStatus.SignedIn

  static toString = (o) => {
    // eslint-disable-next-line consistent-return
    Object.keys(o).forEach(k => {

      if (typeof o[k] === 'object') {
        return CommonUtility.toString(o[k]);
      }
      if (typeof o[k] === "number") {
        o[k] = new Decimal(o[k]);
      }
    });

    return o;
  }

  static toDecimal = (number) => {
    if (!CommonUtility.isNotEmpty(number)) {
      return null;
    }
    return new Decimal(number);
  }

  static isDecimal = (decimal) => {
   return Decimal.isDecimal(decimal)
  }

  static exportToCSV = (reqData,name) => {
    const response = reqData
        .map((row) =>
          row
            .map((item) =>
              typeof item === 'string' && item.indexOf(',') >= 0
                ? `"${item}"`
                : String(item),
            )
            .join(','),
        )
        .join('\n')

      const data = encodeURI(`data:text/csv;charset=utf-8,${response}`)
      const link = document.createElement('a')
      link.href = data;
      link.setAttribute('download', name)
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
  }

  static kycMessageFormat = (message) => {
    return message.replace("user.id_number.value","SSN").replace("kycData.address?.postal_code","Postal Code")
  }

  static validatePhoneNumber = (number, code = "US") => {
    return isValidPhoneNumber(number, code)
  }

  static sleep = async (seconds) => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(), seconds * 1000)
    })
  }

}