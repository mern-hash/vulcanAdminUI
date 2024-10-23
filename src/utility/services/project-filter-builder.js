/** @typedef { 'gold' | 'platinum' | 'silver' } LeedCertified */
/** @typedef { 'PENDING' | 'CLOSED' | 'ACTIVE' | 'UPCOMING' | 'MARKFORADMINAPPROVAL' | 'WAITINGADMINAPPROVAL' | 'REFUNDED' } ProjectStatus */
/** @typedef { 'EQUITY' | 'DEBT' | 'UNITRANCHE_DEBT' } OfferingType */
/** @typedef { 'PURSUIT' | 'DEVELOPMENT' | 'STABILIZED' } ProjectType */
/** @typedef { 'YES' | 'NO' } DefaultEnum */
/** @typedef { 'PRIMARY' | 'SECONDARY' } PrimaryVsSecondary */

export class ProjectFilterBuilder {
  #query = {};

  /** @param {ProjectFilterBuilder[]} projectFilters */
  $or(projectFilters) {
    this.#query = { ...this.#query, $or: projectFilters };
    return this;
  }

  /** @param {ProjectFilterBuilder[]} projectFilters */
  $and(projectFilters) {
    this.#query = { ...this.#query, $and: projectFilters };
    return this;
  }

  /** @param {string} title */
  titleEqual(title) {
    this.#query = { ...this.#query, title: { $eq: title } };
    return this;
  }

  /** @param {string} title */
  titleNotEqual(title) {
    this.#query = { ...this.#query, title: { $ne: title } };
    return this;
  }

  /** @param {string[]} titles */
  titleIn(titles) {
    this.#query = { ...this.#query, title: { $in: titles } };
    return this;
  }

  /** @param {string[]} titles */
  titleNotIn(titles) {
    this.#query = { ...this.#query, title: { $nin: titles } };
    return this;
  }

  /** @param {LeedCertified} leedCertified */
  leedCertifiedEqual(leedCertified) {
    this.#query = { ...this.#query, leedCertified: { $eq: leedCertified } };
    return this;
  }

  /** @param {LeedCertified} leedCertified */
  leedCertifiedNotEqual(leedCertified) {
    this.#query = { ...this.#query, leedCertified: { $ne: leedCertified } };
    return this;
  }

  /** @param {LeedCertified[]} leedCertifieds */
  leedCertifiedIn(leedCertifieds) {
    this.#query = { ...this.#query, leedCertified: { $in: leedCertifieds } };
    return this;
  }

  /** @param {LeedCertified[]} leedCertifieds */
  leedCertifiedNotIn(leedCertifieds) {
    this.#query = { ...this.#query, leedCertified: { $nin: leedCertifieds } };
    return this;
  }

  /** @param {string} name */
  nameEqual(name) {
    this.#query = { ...this.#query, name: { $eq: name } };
    return this;
  }

  /** @param {string} name */
  nameNotEqual(name) {
    this.#query = { ...this.#query, name: { $ne: name } };
    return this;
  }

  /** @param {string[]} names */
  nameIn(names) {
    this.#query = { ...this.#query, name: { $in: names } };
    return this;
  }

  /** @param {string[]} names */
  nameNotIn(names) {
    this.#query = { ...this.#query, name: { $nin: names } };
    return this;
  }

  /** @param {string} description */
  descriptionEqual(description) {
    this.#query = { ...this.#query, description: { $eq: description } };
    return this;
  }

  /** @param {string} description */
  descriptionNotEqual(description) {
    this.#query = { ...this.#query, description: { $ne: description } };
    return this;
  }

  /** @param {string[]} descriptions */
  descriptionIn(descriptions) {
    this.#query = { ...this.#query, description: { $in: descriptions } };
    return this;
  }

  /** @param {string[]} descriptions */
  descriptionNotIn(descriptions) {
    this.#query = { ...this.#query, description: { $nin: descriptions } };
    return this;
  }

  /** @param {string} farPointDevelopment */
  farPointDevelopmentEqual(farPointDevelopment) {
    this.#query = { ...this.#query, farPointDevelopment: { $eq: farPointDevelopment } };
    return this;
  }

  /** @param {string} farPointDevelopment */
  farPointDevelopmentNotEqual(farPointDevelopment) {
    this.#query = { ...this.#query, farPointDevelopment: { $ne: farPointDevelopment } };
    return this;
  }

  /** @param {string[]} farPointDevelopments */
  farPointDevelopmentIn(farPointDevelopments) {
    this.#query = { ...this.#query, farPointDevelopment: { $in: farPointDevelopments } };
    return this;
  }

  /** @param {string[]} farPointDevelopments */
  farPointDevelopmentNotIn(farPointDevelopments) {
    this.#query = { ...this.#query, farPointDevelopment: { $nin: farPointDevelopments } };
    return this;
  }

  /** @param {string} assetType */
  assetTypeEqual(assetType) {
    this.#query = { ...this.#query, assetType: { $eq: assetType } };
    return this;
  }

  /** @param {string} assetType */
  assetTypeNotEqual(assetType) {
    this.#query = { ...this.#query, assetType: { $ne: assetType } };
    return this;
  }

  /** @param {string[]} assetTypes */
  assetTypeIn(assetTypes) {
    this.#query = { ...this.#query, assetType: { $in: assetTypes } };
    return this;
  }

  /** @param {string[]} assetTypes */
  assetTypeNotIn(assetTypes) {
    this.#query = { ...this.#query, assetType: { $nin: assetTypes } };
    return this;
  }

  /** @param {string} addressLocation */
  addressLocationEqual(addressLocation) {
    this.#query = { ...this.#query, addressLocation: { $eq: addressLocation } };
    return this;
  }

  /** @param {string} addressLocation */
  addressLocationNotEqual(addressLocation) {
    this.#query = { ...this.#query, addressLocation: { $ne: addressLocation } };
    return this;
  }

  /** @param {string[]} addressLocations */
  addressLocationIn(addressLocations) {
    this.#query = { ...this.#query, addressLocation: { $in: addressLocations } };
    return this;
  }

  /** @param {string[]} addressLocations */
  addressLocationNotIn(addressLocations) {
    this.#query = { ...this.#query, addressLocation: { $nin: addressLocations } };
    return this;
  }

  /** @param {ProjectStatus} status */
  statusEqual(status) {
    this.#query = { ...this.#query, status: { $eq: status } };
    return this;
  }

  /** @param {ProjectStatus} status */
  statusNotEqual(status) {
    this.#query = { ...this.#query, status: { $ne: status } };
    return this;
  }

  /** @param {ProjectStatus[]} statuss */
  statusIn(statuss) {
    this.#query = { ...this.#query, status: { $in: statuss } };
    return this;
  }

  /** @param {ProjectStatus[]} statuss */
  statusNotIn(statuss) {
    this.#query = { ...this.#query, status: { $nin: statuss } };
    return this;
  }

  /** @param {string} msa */
  msaEqual(msa) {
    this.#query = { ...this.#query, msa: { $eq: msa } };
    return this;
  }

  /** @param {string} msa */
  msaNotEqual(msa) {
    this.#query = { ...this.#query, msa: { $ne: msa } };
    return this;
  }

  /** @param {string[]} msas */
  msaIn(msas) {
    this.#query = { ...this.#query, msa: { $in: msas } };
    return this;
  }

  /** @param {string[]} msas */
  msaNotIn(msas) {
    this.#query = { ...this.#query, msa: { $nin: msas } };
    return this;
  }

  /** @param {number} projectedAppraisedAssetValue */
  projectedAppraisedAssetValueEqual(projectedAppraisedAssetValue) {
    this.#query = { ...this.#query, projectedAppraisedAssetValue: { $eq: projectedAppraisedAssetValue } };
    return this;
  }

  /** @param {number} projectedAppraisedAssetValue */
  projectedAppraisedAssetValueNotEqual(projectedAppraisedAssetValue) {
    this.#query = { ...this.#query, projectedAppraisedAssetValue: { $ne: projectedAppraisedAssetValue } };
    return this;
  }

  /** @param {number[]} projectedAppraisedAssetValues */
  projectedAppraisedAssetValueIn(projectedAppraisedAssetValues) {
    this.#query = { ...this.#query, projectedAppraisedAssetValue: { $in: projectedAppraisedAssetValues } };
    return this;
  }

  /** @param {number[]} projectedAppraisedAssetValues */
  projectedAppraisedAssetValueNotIn(projectedAppraisedAssetValues) {
    this.#query = { ...this.#query, projectedAppraisedAssetValue: { $nin: projectedAppraisedAssetValues } };
    return this;
  }

  /** @param {number} projectedAppraisedAssetValue */
  projectedAppraisedAssetValueLessThan(projectedAppraisedAssetValue) {
    this.#query = { ...this.#query, projectedAppraisedAssetValue: { $lt: projectedAppraisedAssetValue } };
    return this;
  }

  /** @param {number} projectedAppraisedAssetValue */
  projectedAppraisedAssetValueLessThanOrEqual(projectedAppraisedAssetValue) {
    this.#query = { ...this.#query, projectedAppraisedAssetValue: { $lte: projectedAppraisedAssetValue } };
    return this;
  }

  /** @param {number} projectedAppraisedAssetValue */
  projectedAppraisedAssetValueGreaterThan(projectedAppraisedAssetValue) {
    this.#query = { ...this.#query, projectedAppraisedAssetValue: { $gt: projectedAppraisedAssetValue } };
    return this;
  }

  /** @param {number} projectedAppraisedAssetValue */
  projectedAppraisedAssetValueGreaterThanOrEqual(projectedAppraisedAssetValue) {
    this.#query = { ...this.#query, projectedAppraisedAssetValue: { $gte: projectedAppraisedAssetValue } };
    return this;
  }

  /** @param {number} projectedAppraisedAssetValue */
  projectedAppraisedAssetValueBetween(projectedAppraisedAssetValue, projectedAppraisedAssetValue2) {
    this.#query = { ...this.#query, projectedAppraisedAssetValue: { $gte: projectedAppraisedAssetValue, $lte: projectedAppraisedAssetValue2 } };
    return this;
  }

  /** @param {number} totalDevelopmentCost */
  totalDevelopmentCostEqual(totalDevelopmentCost) {
    this.#query = { ...this.#query, totalDevelopmentCost: { $eq: totalDevelopmentCost } };
    return this;
  }

  /** @param {number} totalDevelopmentCost */
  totalDevelopmentCostNotEqual(totalDevelopmentCost) {
    this.#query = { ...this.#query, totalDevelopmentCost: { $ne: totalDevelopmentCost } };
    return this;
  }

  /** @param {number[]} totalDevelopmentCosts */
  totalDevelopmentCostIn(totalDevelopmentCosts) {
    this.#query = { ...this.#query, totalDevelopmentCost: { $in: totalDevelopmentCosts } };
    return this;
  }

  /** @param {number[]} totalDevelopmentCosts */
  totalDevelopmentCostNotIn(totalDevelopmentCosts) {
    this.#query = { ...this.#query, totalDevelopmentCost: { $nin: totalDevelopmentCosts } };
    return this;
  }

  /** @param {number} totalDevelopmentCost */
  totalDevelopmentCostLessThan(totalDevelopmentCost) {
    this.#query = { ...this.#query, totalDevelopmentCost: { $lt: totalDevelopmentCost } };
    return this;
  }

  /** @param {number} totalDevelopmentCost */
  totalDevelopmentCostLessThanOrEqual(totalDevelopmentCost) {
    this.#query = { ...this.#query, totalDevelopmentCost: { $lte: totalDevelopmentCost } };
    return this;
  }

  /** @param {number} totalDevelopmentCost */
  totalDevelopmentCostGreaterThan(totalDevelopmentCost) {
    this.#query = { ...this.#query, totalDevelopmentCost: { $gt: totalDevelopmentCost } };
    return this;
  }

  /** @param {number} totalDevelopmentCost */
  totalDevelopmentCostGreaterThanOrEqual(totalDevelopmentCost) {
    this.#query = { ...this.#query, totalDevelopmentCost: { $gte: totalDevelopmentCost } };
    return this;
  }

  /** @param {number} totalDevelopmentCost */
  totalDevelopmentCostBetween(totalDevelopmentCost, totalDevelopmentCost2) {
    this.#query = { ...this.#query, totalDevelopmentCost: { $gte: totalDevelopmentCost, $lte: totalDevelopmentCost2 } };
    return this;
  }

  /** @param {OfferingType} offeringType */
  offeringTypeEqual(offeringType) {
    this.#query = { ...this.#query, offeringType: { $eq: offeringType } };
    return this;
  }

  /** @param {OfferingType} offeringType */
  offeringTypeNotEqual(offeringType) {
    this.#query = { ...this.#query, offeringType: { $ne: offeringType } };
    return this;
  }

  /** @param {OfferingType[]} offeringTypes */
  offeringTypeIn(offeringTypes) {
    this.#query = { ...this.#query, offeringType: { $in: offeringTypes } };
    return this;
  }

  /** @param {OfferingType[]} offeringTypes */
  offeringTypeNotIn(offeringTypes) {
    this.#query = { ...this.#query, offeringType: { $nin: offeringTypes } };
    return this;
  }

  /** @param {ProjectType} projectType */
  projectTypeEqual(projectType) {
    this.#query = { ...this.#query, projectType: { $eq: projectType } };
    return this;
  }

  /** @param {ProjectType} projectType */
  projectTypeNotEqual(projectType) {
    this.#query = { ...this.#query, projectType: { $ne: projectType } };
    return this;
  }

  /** @param {ProjectType[]} projectTypes */
  projectTypeIn(projectTypes) {
    this.#query = { ...this.#query, projectType: { $in: projectTypes } };
    return this;
  }

  /** @param {ProjectType[]} projectTypes */
  projectTypeNotIn(projectTypes) {
    this.#query = { ...this.#query, projectType: { $nin: projectTypes } };
    return this;
  }

  /** @param {number} totalFundRequired */
  totalFundRequiredEqual(totalFundRequired) {
    this.#query = { ...this.#query, totalFundRequired: { $eq: totalFundRequired } };
    return this;
  }

  /** @param {number} totalFundRequired */
  totalFundRequiredNotEqual(totalFundRequired) {
    this.#query = { ...this.#query, totalFundRequired: { $ne: totalFundRequired } };
    return this;
  }

  /** @param {number[]} totalFundRequireds */
  totalFundRequiredIn(totalFundRequireds) {
    this.#query = { ...this.#query, totalFundRequired: { $in: totalFundRequireds } };
    return this;
  }

  /** @param {number[]} totalFundRequireds */
  totalFundRequiredNotIn(totalFundRequireds) {
    this.#query = { ...this.#query, totalFundRequired: { $nin: totalFundRequireds } };
    return this;
  }

  /** @param {number} totalFundRequired */
  totalFundRequiredLessThan(totalFundRequired) {
    this.#query = { ...this.#query, totalFundRequired: { $lt: totalFundRequired } };
    return this;
  }

  /** @param {number} totalFundRequired */
  totalFundRequiredLessThanOrEqual(totalFundRequired) {
    this.#query = { ...this.#query, totalFundRequired: { $lte: totalFundRequired } };
    return this;
  }

  /** @param {number} totalFundRequired */
  totalFundRequiredGreaterThan(totalFundRequired) {
    this.#query = { ...this.#query, totalFundRequired: { $gt: totalFundRequired } };
    return this;
  }

  /** @param {number} totalFundRequired */
  totalFundRequiredGreaterThanOrEqual(totalFundRequired) {
    this.#query = { ...this.#query, totalFundRequired: { $gte: totalFundRequired } };
    return this;
  }

  /** @param {number} totalFundRequired */
  totalFundRequiredBetween(totalFundRequired, totalFundRequired2) {
    this.#query = { ...this.#query, totalFundRequired: { $gte: totalFundRequired, $lte: totalFundRequired2 } };
    return this;
  }

  /** @param {number} targetedInvestorLeveredIrr */
  targetedInvestorLeveredIrrEqual(targetedInvestorLeveredIrr) {
    this.#query = { ...this.#query, targetedInvestorLeveredIrr: { $eq: targetedInvestorLeveredIrr } };
    return this;
  }

  /** @param {number} targetedInvestorLeveredIrr */
  targetedInvestorLeveredIrrNotEqual(targetedInvestorLeveredIrr) {
    this.#query = { ...this.#query, targetedInvestorLeveredIrr: { $ne: targetedInvestorLeveredIrr } };
    return this;
  }

  /** @param {number[]} targetedInvestorLeveredIrrs */
  targetedInvestorLeveredIrrIn(targetedInvestorLeveredIrrs) {
    this.#query = { ...this.#query, targetedInvestorLeveredIrr: { $in: targetedInvestorLeveredIrrs } };
    return this;
  }

  /** @param {number[]} targetedInvestorLeveredIrrs */
  targetedInvestorLeveredIrrNotIn(targetedInvestorLeveredIrrs) {
    this.#query = { ...this.#query, targetedInvestorLeveredIrr: { $nin: targetedInvestorLeveredIrrs } };
    return this;
  }

  /** @param {number} targetedInvestorLeveredIrr */
  targetedInvestorLeveredIrrLessThan(targetedInvestorLeveredIrr) {
    this.#query = { ...this.#query, targetedInvestorLeveredIrr: { $lt: targetedInvestorLeveredIrr } };
    return this;
  }

  /** @param {number} targetedInvestorLeveredIrr */
  targetedInvestorLeveredIrrLessThanOrEqual(targetedInvestorLeveredIrr) {
    this.#query = { ...this.#query, targetedInvestorLeveredIrr: { $lte: targetedInvestorLeveredIrr } };
    return this;
  }

  /** @param {number} targetedInvestorLeveredIrr */
  targetedInvestorLeveredIrrGreaterThan(targetedInvestorLeveredIrr) {
    this.#query = { ...this.#query, targetedInvestorLeveredIrr: { $gt: targetedInvestorLeveredIrr } };
    return this;
  }

  /** @param {number} targetedInvestorLeveredIrr */
  targetedInvestorLeveredIrrGreaterThanOrEqual(targetedInvestorLeveredIrr) {
    this.#query = { ...this.#query, targetedInvestorLeveredIrr: { $gte: targetedInvestorLeveredIrr } };
    return this;
  }

  /** @param {number} targetedInvestorLeveredIrr */
  targetedInvestorLeveredIrrBetween(targetedInvestorLeveredIrr, targetedInvestorLeveredIrr2) {
    this.#query = { ...this.#query, targetedInvestorLeveredIrr: { $gte: targetedInvestorLeveredIrr, $lte: targetedInvestorLeveredIrr2 } };
    return this;
  }

  /** @param {number} targetedInvestorUnleveredIrr */
  targetedInvestorUnleveredIrrEqual(targetedInvestorUnleveredIrr) {
    this.#query = { ...this.#query, targetedInvestorUnleveredIrr: { $eq: targetedInvestorUnleveredIrr } };
    return this;
  }

  /** @param {number} targetedInvestorUnleveredIrr */
  targetedInvestorUnleveredIrrNotEqual(targetedInvestorUnleveredIrr) {
    this.#query = { ...this.#query, targetedInvestorUnleveredIrr: { $ne: targetedInvestorUnleveredIrr } };
    return this;
  }

  /** @param {number[]} targetedInvestorUnleveredIrrs */
  targetedInvestorUnleveredIrrIn(targetedInvestorUnleveredIrrs) {
    this.#query = { ...this.#query, targetedInvestorUnleveredIrr: { $in: targetedInvestorUnleveredIrrs } };
    return this;
  }

  /** @param {number[]} targetedInvestorUnleveredIrrs */
  targetedInvestorUnleveredIrrNotIn(targetedInvestorUnleveredIrrs) {
    this.#query = { ...this.#query, targetedInvestorUnleveredIrr: { $nin: targetedInvestorUnleveredIrrs } };
    return this;
  }

  /** @param {number} targetedInvestorUnleveredIrr */
  targetedInvestorUnleveredIrrLessThan(targetedInvestorUnleveredIrr) {
    this.#query = { ...this.#query, targetedInvestorUnleveredIrr: { $lt: targetedInvestorUnleveredIrr } };
    return this;
  }

  /** @param {number} targetedInvestorUnleveredIrr */
  targetedInvestorUnleveredIrrLessThanOrEqual(targetedInvestorUnleveredIrr) {
    this.#query = { ...this.#query, targetedInvestorUnleveredIrr: { $lte: targetedInvestorUnleveredIrr } };
    return this;
  }

  /** @param {number} targetedInvestorUnleveredIrr */
  targetedInvestorUnleveredIrrGreaterThan(targetedInvestorUnleveredIrr) {
    this.#query = { ...this.#query, targetedInvestorUnleveredIrr: { $gt: targetedInvestorUnleveredIrr } };
    return this;
  }

  /** @param {number} targetedInvestorUnleveredIrr */
  targetedInvestorUnleveredIrrGreaterThanOrEqual(targetedInvestorUnleveredIrr) {
    this.#query = { ...this.#query, targetedInvestorUnleveredIrr: { $gte: targetedInvestorUnleveredIrr } };
    return this;
  }

  /** @param {number} targetedInvestorUnleveredIrr */
  targetedInvestorUnleveredIrrBetween(targetedInvestorUnleveredIrr, targetedInvestorUnleveredIrr2) {
    this.#query = { ...this.#query, targetedInvestorUnleveredIrr: { $gte: targetedInvestorUnleveredIrr, $lte: targetedInvestorUnleveredIrr2 } };
    return this;
  }

  /** @param {number} targetedEquityMultiple */
  targetedEquityMultipleEqual(targetedEquityMultiple) {
    this.#query = { ...this.#query, targetedEquityMultiple: { $eq: targetedEquityMultiple } };
    return this;
  }

  /** @param {number} targetedEquityMultiple */
  targetedEquityMultipleNotEqual(targetedEquityMultiple) {
    this.#query = { ...this.#query, targetedEquityMultiple: { $ne: targetedEquityMultiple } };
    return this;
  }

  /** @param {number[]} targetedEquityMultiples */
  targetedEquityMultipleIn(targetedEquityMultiples) {
    this.#query = { ...this.#query, targetedEquityMultiple: { $in: targetedEquityMultiples } };
    return this;
  }

  /** @param {number[]} targetedEquityMultiples */
  targetedEquityMultipleNotIn(targetedEquityMultiples) {
    this.#query = { ...this.#query, targetedEquityMultiple: { $nin: targetedEquityMultiples } };
    return this;
  }

  /** @param {number} targetedEquityMultiple */
  targetedEquityMultipleLessThan(targetedEquityMultiple) {
    this.#query = { ...this.#query, targetedEquityMultiple: { $lt: targetedEquityMultiple } };
    return this;
  }

  /** @param {number} targetedEquityMultiple */
  targetedEquityMultipleLessThanOrEqual(targetedEquityMultiple) {
    this.#query = { ...this.#query, targetedEquityMultiple: { $lte: targetedEquityMultiple } };
    return this;
  }

  /** @param {number} targetedEquityMultiple */
  targetedEquityMultipleGreaterThan(targetedEquityMultiple) {
    this.#query = { ...this.#query, targetedEquityMultiple: { $gt: targetedEquityMultiple } };
    return this;
  }

  /** @param {number} targetedEquityMultiple */
  targetedEquityMultipleGreaterThanOrEqual(targetedEquityMultiple) {
    this.#query = { ...this.#query, targetedEquityMultiple: { $gte: targetedEquityMultiple } };
    return this;
  }

  /** @param {number} targetedEquityMultiple */
  targetedEquityMultipleBetween(targetedEquityMultiple, targetedEquityMultiple2) {
    this.#query = { ...this.#query, targetedEquityMultiple: { $gte: targetedEquityMultiple, $lte: targetedEquityMultiple2 } };
    return this;
  }

  /** @param {number} totalDevelopmentPeriodInMonths */
  totalDevelopmentPeriodInMonthsEqual(totalDevelopmentPeriodInMonths) {
    this.#query = { ...this.#query, totalDevelopmentPeriodInMonths: { $eq: totalDevelopmentPeriodInMonths } };
    return this;
  }

  /** @param {number} totalDevelopmentPeriodInMonths */
  totalDevelopmentPeriodInMonthsNotEqual(totalDevelopmentPeriodInMonths) {
    this.#query = { ...this.#query, totalDevelopmentPeriodInMonths: { $ne: totalDevelopmentPeriodInMonths } };
    return this;
  }

  /** @param {number[]} totalDevelopmentPeriodInMonthss */
  totalDevelopmentPeriodInMonthsIn(totalDevelopmentPeriodInMonthss) {
    this.#query = { ...this.#query, totalDevelopmentPeriodInMonths: { $in: totalDevelopmentPeriodInMonthss } };
    return this;
  }

  /** @param {number[]} totalDevelopmentPeriodInMonthss */
  totalDevelopmentPeriodInMonthsNotIn(totalDevelopmentPeriodInMonthss) {
    this.#query = { ...this.#query, totalDevelopmentPeriodInMonths: { $nin: totalDevelopmentPeriodInMonthss } };
    return this;
  }

  /** @param {number} totalDevelopmentPeriodInMonths */
  totalDevelopmentPeriodInMonthsLessThan(totalDevelopmentPeriodInMonths) {
    this.#query = { ...this.#query, totalDevelopmentPeriodInMonths: { $lt: totalDevelopmentPeriodInMonths } };
    return this;
  }

  /** @param {number} totalDevelopmentPeriodInMonths */
  totalDevelopmentPeriodInMonthsLessThanOrEqual(totalDevelopmentPeriodInMonths) {
    this.#query = { ...this.#query, totalDevelopmentPeriodInMonths: { $lte: totalDevelopmentPeriodInMonths } };
    return this;
  }

  /** @param {number} totalDevelopmentPeriodInMonths */
  totalDevelopmentPeriodInMonthsGreaterThan(totalDevelopmentPeriodInMonths) {
    this.#query = { ...this.#query, totalDevelopmentPeriodInMonths: { $gt: totalDevelopmentPeriodInMonths } };
    return this;
  }

  /** @param {number} totalDevelopmentPeriodInMonths */
  totalDevelopmentPeriodInMonthsGreaterThanOrEqual(totalDevelopmentPeriodInMonths) {
    this.#query = { ...this.#query, totalDevelopmentPeriodInMonths: { $gte: totalDevelopmentPeriodInMonths } };
    return this;
  }

  /** @param {number} totalDevelopmentPeriodInMonths */
  totalDevelopmentPeriodInMonthsBetween(totalDevelopmentPeriodInMonths, totalDevelopmentPeriodInMonths2) {
    this.#query = { ...this.#query, totalDevelopmentPeriodInMonths: { $gte: totalDevelopmentPeriodInMonths, $lte: totalDevelopmentPeriodInMonths2 } };
    return this;
  }

  /** @param {Decimal} navPerShare */
  navPerShareEqual(navPerShare) {
    this.#query = { ...this.#query, navPerShare: { $eq: navPerShare } };
    return this;
  }

  /** @param {Decimal} navPerShare */
  navPerShareNotEqual(navPerShare) {
    this.#query = { ...this.#query, navPerShare: { $ne: navPerShare } };
    return this;
  }

  /** @param {Decimal[]} navPerShares */
  navPerShareIn(navPerShares) {
    this.#query = { ...this.#query, navPerShare: { $in: navPerShares } };
    return this;
  }

  /** @param {Decimal[]} navPerShares */
  navPerShareNotIn(navPerShares) {
    this.#query = { ...this.#query, navPerShare: { $nin: navPerShares } };
    return this;
  }

  /** @param {Decimal} ltmReturnPerShare */
  ltmReturnPerShareEqual(ltmReturnPerShare) {
    this.#query = { ...this.#query, ltmReturnPerShare: { $eq: ltmReturnPerShare } };
    return this;
  }

  /** @param {Decimal} ltmReturnPerShare */
  ltmReturnPerShareNotEqual(ltmReturnPerShare) {
    this.#query = { ...this.#query, ltmReturnPerShare: { $ne: ltmReturnPerShare } };
    return this;
  }

  /** @param {Decimal[]} ltmReturnPerShares */
  ltmReturnPerShareIn(ltmReturnPerShares) {
    this.#query = { ...this.#query, ltmReturnPerShare: { $in: ltmReturnPerShares } };
    return this;
  }

  /** @param {Decimal[]} ltmReturnPerShares */
  ltmReturnPerShareNotIn(ltmReturnPerShares) {
    this.#query = { ...this.#query, ltmReturnPerShare: { $nin: ltmReturnPerShares } };
    return this;
  }

  /** @param {number} lifetimeReturn */
  lifetimeReturnEqual(lifetimeReturn) {
    this.#query = { ...this.#query, lifetimeReturn: { $eq: lifetimeReturn } };
    return this;
  }

  /** @param {number} lifetimeReturn */
  lifetimeReturnNotEqual(lifetimeReturn) {
    this.#query = { ...this.#query, lifetimeReturn: { $ne: lifetimeReturn } };
    return this;
  }

  /** @param {number[]} lifetimeReturns */
  lifetimeReturnIn(lifetimeReturns) {
    this.#query = { ...this.#query, lifetimeReturn: { $in: lifetimeReturns } };
    return this;
  }

  /** @param {number[]} lifetimeReturns */
  lifetimeReturnNotIn(lifetimeReturns) {
    this.#query = { ...this.#query, lifetimeReturn: { $nin: lifetimeReturns } };
    return this;
  }

  /** @param {number} lifetimeReturn */
  lifetimeReturnLessThan(lifetimeReturn) {
    this.#query = { ...this.#query, lifetimeReturn: { $lt: lifetimeReturn } };
    return this;
  }

  /** @param {number} lifetimeReturn */
  lifetimeReturnLessThanOrEqual(lifetimeReturn) {
    this.#query = { ...this.#query, lifetimeReturn: { $lte: lifetimeReturn } };
    return this;
  }

  /** @param {number} lifetimeReturn */
  lifetimeReturnGreaterThan(lifetimeReturn) {
    this.#query = { ...this.#query, lifetimeReturn: { $gt: lifetimeReturn } };
    return this;
  }

  /** @param {number} lifetimeReturn */
  lifetimeReturnGreaterThanOrEqual(lifetimeReturn) {
    this.#query = { ...this.#query, lifetimeReturn: { $gte: lifetimeReturn } };
    return this;
  }

  /** @param {number} lifetimeReturn */
  lifetimeReturnBetween(lifetimeReturn, lifetimeReturn2) {
    this.#query = { ...this.#query, lifetimeReturn: { $gte: lifetimeReturn, $lte: lifetimeReturn2 } };
    return this;
  }

  /** @param {Date} transactionCloseDate */
  transactionCloseDateEqual(transactionCloseDate) {
    this.#query = { ...this.#query, transactionCloseDate: { $eq: transactionCloseDate } };
    return this;
  }

  /** @param {Date} transactionCloseDate */
  transactionCloseDateNotEqual(transactionCloseDate) {
    this.#query = { ...this.#query, transactionCloseDate: { $ne: transactionCloseDate } };
    return this;
  }

  /** @param {Date[]} transactionCloseDates */
  transactionCloseDateIn(transactionCloseDates) {
    this.#query = { ...this.#query, transactionCloseDate: { $in: transactionCloseDates } };
    return this;
  }

  /** @param {Date[]} transactionCloseDates */
  transactionCloseDateNotIn(transactionCloseDates) {
    this.#query = { ...this.#query, transactionCloseDate: { $nin: transactionCloseDates } };
    return this;
  }

  /** @param {Date} transactionCloseDate */
  transactionCloseDateLessThan(transactionCloseDate) {
    this.#query = { ...this.#query, transactionCloseDate: { $lt: transactionCloseDate } };
    return this;
  }

  /** @param {Date} transactionCloseDate */
  transactionCloseDateLessThanOrEqual(transactionCloseDate) {
    this.#query = { ...this.#query, transactionCloseDate: { $lte: transactionCloseDate } };
    return this;
  }

  /** @param {Date} transactionCloseDate */
  transactionCloseDateGreaterThan(transactionCloseDate) {
    this.#query = { ...this.#query, transactionCloseDate: { $gt: transactionCloseDate } };
    return this;
  }

  /** @param {Date} transactionCloseDate */
  transactionCloseDateGreaterThanOrEqual(transactionCloseDate) {
    this.#query = { ...this.#query, transactionCloseDate: { $gte: transactionCloseDate } };
    return this;
  }

  /** @param {Date} transactionCloseDate */
  transactionCloseDateBetween(transactionCloseDate, transactionCloseDate2) {
    this.#query = { ...this.#query, transactionCloseDate: { $gte: transactionCloseDate, $lte: transactionCloseDate2 } };
    return this;
  }

  /** @param {number} esgScore */
  esgScoreEqual(esgScore) {
    this.#query = { ...this.#query, esgScore: { $eq: esgScore } };
    return this;
  }

  /** @param {number} esgScore */
  esgScoreNotEqual(esgScore) {
    this.#query = { ...this.#query, esgScore: { $ne: esgScore } };
    return this;
  }

  /** @param {number[]} esgScores */
  esgScoreIn(esgScores) {
    this.#query = { ...this.#query, esgScore: { $in: esgScores } };
    return this;
  }

  /** @param {number[]} esgScores */
  esgScoreNotIn(esgScores) {
    this.#query = { ...this.#query, esgScore: { $nin: esgScores } };
    return this;
  }

  /** @param {number} esgScore */
  esgScoreLessThan(esgScore) {
    this.#query = { ...this.#query, esgScore: { $lt: esgScore } };
    return this;
  }

  /** @param {number} esgScore */
  esgScoreLessThanOrEqual(esgScore) {
    this.#query = { ...this.#query, esgScore: { $lte: esgScore } };
    return this;
  }

  /** @param {number} esgScore */
  esgScoreGreaterThan(esgScore) {
    this.#query = { ...this.#query, esgScore: { $gt: esgScore } };
    return this;
  }

  /** @param {number} esgScore */
  esgScoreGreaterThanOrEqual(esgScore) {
    this.#query = { ...this.#query, esgScore: { $gte: esgScore } };
    return this;
  }

  /** @param {number} esgScore */
  esgScoreBetween(esgScore, esgScore2) {
    this.#query = { ...this.#query, esgScore: { $gte: esgScore, $lte: esgScore2 } };
    return this;
  }

  /** @param {DefaultEnum} isDefault */
  isDefaultEqual(isDefault) {
    this.#query = { ...this.#query, isDefault: { $eq: isDefault } };
    return this;
  }

  /** @param {DefaultEnum} isDefault */
  isDefaultNotEqual(isDefault) {
    this.#query = { ...this.#query, isDefault: { $ne: isDefault } };
    return this;
  }

  /** @param {DefaultEnum[]} isDefaults */
  isDefaultIn(isDefaults) {
    this.#query = { ...this.#query, isDefault: { $in: isDefaults } };
    return this;
  }

  /** @param {DefaultEnum[]} isDefaults */
  isDefaultNotIn(isDefaults) {
    this.#query = { ...this.#query, isDefault: { $nin: isDefaults } };
    return this;
  }

  /** @param {PrimaryVsSecondary} primaryVsSecondary */
  primaryVsSecondaryEqual(primaryVsSecondary) {
    this.#query = { ...this.#query, primaryVsSecondary: { $eq: primaryVsSecondary } };
    return this;
  }

  /** @param {PrimaryVsSecondary} primaryVsSecondary */
  primaryVsSecondaryNotEqual(primaryVsSecondary) {
    this.#query = { ...this.#query, primaryVsSecondary: { $ne: primaryVsSecondary } };
    return this;
  }

  /** @param {PrimaryVsSecondary[]} primaryVsSecondarys */
  primaryVsSecondaryIn(primaryVsSecondarys) {
    this.#query = { ...this.#query, primaryVsSecondary: { $in: primaryVsSecondarys } };
    return this;
  }

  /** @param {PrimaryVsSecondary[]} primaryVsSecondarys */
  primaryVsSecondaryNotIn(primaryVsSecondarys) {
    this.#query = { ...this.#query, primaryVsSecondary: { $nin: primaryVsSecondarys } };
    return this;
  }

  /** @param {string} developmentStage */
  developmentStageEqual(developmentStage) {
    this.#query = { ...this.#query, developmentStage: { $eq: developmentStage } };
    return this;
  }

  /** @param {string} developmentStage */
  developmentStageNotEqual(developmentStage) {
    this.#query = { ...this.#query, developmentStage: { $ne: developmentStage } };
    return this;
  }

  /** @param {string[]} developmentStages */
  developmentStageIn(developmentStages) {
    this.#query = { ...this.#query, developmentStage: { $in: developmentStages } };
    return this;
  }

  /** @param {string[]} developmentStages */
  developmentStageNotIn(developmentStages) {
    this.#query = { ...this.#query, developmentStage: { $nin: developmentStages } };
    return this;
  }

  /** @param {number} contractedRevenueAsAPercentageOfTheProforma */
  contractedRevenueAsAPercentageOfTheProformaEqual(contractedRevenueAsAPercentageOfTheProforma) {
    this.#query = { ...this.#query, contractedRevenueAsAPercentageOfTheProforma: { $eq: contractedRevenueAsAPercentageOfTheProforma } };
    return this;
  }

  /** @param {number} contractedRevenueAsAPercentageOfTheProforma */
  contractedRevenueAsAPercentageOfTheProformaNotEqual(contractedRevenueAsAPercentageOfTheProforma) {
    this.#query = { ...this.#query, contractedRevenueAsAPercentageOfTheProforma: { $ne: contractedRevenueAsAPercentageOfTheProforma } };
    return this;
  }

  /** @param {number[]} contractedRevenueAsAPercentageOfTheProformas */
  contractedRevenueAsAPercentageOfTheProformaIn(contractedRevenueAsAPercentageOfTheProformas) {
    this.#query = { ...this.#query, contractedRevenueAsAPercentageOfTheProforma: { $in: contractedRevenueAsAPercentageOfTheProformas } };
    return this;
  }

  /** @param {number[]} contractedRevenueAsAPercentageOfTheProformas */
  contractedRevenueAsAPercentageOfTheProformaNotIn(contractedRevenueAsAPercentageOfTheProformas) {
    this.#query = { ...this.#query, contractedRevenueAsAPercentageOfTheProforma: { $nin: contractedRevenueAsAPercentageOfTheProformas } };
    return this;
  }

  /** @param {number} contractedRevenueAsAPercentageOfTheProforma */
  contractedRevenueAsAPercentageOfTheProformaLessThan(contractedRevenueAsAPercentageOfTheProforma) {
    this.#query = { ...this.#query, contractedRevenueAsAPercentageOfTheProforma: { $lt: contractedRevenueAsAPercentageOfTheProforma } };
    return this;
  }

  /** @param {number} contractedRevenueAsAPercentageOfTheProforma */
  contractedRevenueAsAPercentageOfTheProformaLessThanOrEqual(contractedRevenueAsAPercentageOfTheProforma) {
    this.#query = { ...this.#query, contractedRevenueAsAPercentageOfTheProforma: { $lte: contractedRevenueAsAPercentageOfTheProforma } };
    return this;
  }

  /** @param {number} contractedRevenueAsAPercentageOfTheProforma */
  contractedRevenueAsAPercentageOfTheProformaGreaterThan(contractedRevenueAsAPercentageOfTheProforma) {
    this.#query = { ...this.#query, contractedRevenueAsAPercentageOfTheProforma: { $gt: contractedRevenueAsAPercentageOfTheProforma } };
    return this;
  }

  /** @param {number} contractedRevenueAsAPercentageOfTheProforma */
  contractedRevenueAsAPercentageOfTheProformaGreaterThanOrEqual(contractedRevenueAsAPercentageOfTheProforma) {
    this.#query = { ...this.#query, contractedRevenueAsAPercentageOfTheProforma: { $gte: contractedRevenueAsAPercentageOfTheProforma } };
    return this;
  }

  /** @param {number} contractedRevenueAsAPercentageOfTheProforma */
  contractedRevenueAsAPercentageOfTheProformaBetween(contractedRevenueAsAPercentageOfTheProforma, contractedRevenueAsAPercentageOfTheProforma2) {
    this.#query = { ...this.#query, contractedRevenueAsAPercentageOfTheProforma: { $gte: contractedRevenueAsAPercentageOfTheProforma, $lte: contractedRevenueAsAPercentageOfTheProforma2 } };
    return this;
  }

  /** @param {number} leased */
  leasedEqual(leased) {
    this.#query = { ...this.#query, leased: { $eq: leased } };
    return this;
  }

  /** @param {number} leased */
  leasedNotEqual(leased) {
    this.#query = { ...this.#query, leased: { $ne: leased } };
    return this;
  }

  /** @param {number[]} leaseds */
  leasedIn(leaseds) {
    this.#query = { ...this.#query, leased: { $in: leaseds } };
    return this;
  }

  /** @param {number[]} leaseds */
  leasedNotIn(leaseds) {
    this.#query = { ...this.#query, leased: { $nin: leaseds } };
    return this;
  }

  /** @param {number} leased */
  leasedLessThan(leased) {
    this.#query = { ...this.#query, leased: { $lt: leased } };
    return this;
  }

  /** @param {number} leased */
  leasedLessThanOrEqual(leased) {
    this.#query = { ...this.#query, leased: { $lte: leased } };
    return this;
  }

  /** @param {number} leased */
  leasedGreaterThan(leased) {
    this.#query = { ...this.#query, leased: { $gt: leased } };
    return this;
  }

  /** @param {number} leased */
  leasedGreaterThanOrEqual(leased) {
    this.#query = { ...this.#query, leased: { $gte: leased } };
    return this;
  }

  /** @param {number} leased */
  leasedBetween(leased, leased2) {
    this.#query = { ...this.#query, leased: { $gte: leased, $lte: leased2 } };
    return this;
  }

  /** @param {string} offeringSummary */
  offeringSummaryEqual(offeringSummary) {
    this.#query = { ...this.#query, offeringSummary: { $eq: offeringSummary } };
    return this;
  }

  /** @param {string} offeringSummary */
  offeringSummaryNotEqual(offeringSummary) {
    this.#query = { ...this.#query, offeringSummary: { $ne: offeringSummary } };
    return this;
  }

  /** @param {string[]} offeringSummarys */
  offeringSummaryIn(offeringSummarys) {
    this.#query = { ...this.#query, offeringSummary: { $in: offeringSummarys } };
    return this;
  }

  /** @param {string[]} offeringSummarys */
  offeringSummaryNotIn(offeringSummarys) {
    this.#query = { ...this.#query, offeringSummary: { $nin: offeringSummarys } };
    return this;
  }

  /** @param {Decimal} equityRaisedPercentage */
  equityRaisedPercentageEqual(equityRaisedPercentage) {
    this.#query = { ...this.#query, equityRaisedPercentage: { $eq: equityRaisedPercentage } };
    return this;
  }

  /** @param {Decimal} equityRaisedPercentage */
  equityRaisedPercentageNotEqual(equityRaisedPercentage) {
    this.#query = { ...this.#query, equityRaisedPercentage: { $ne: equityRaisedPercentage } };
    return this;
  }

  /** @param {Decimal[]} equityRaisedPercentages */
  equityRaisedPercentageIn(equityRaisedPercentages) {
    this.#query = { ...this.#query, equityRaisedPercentage: { $in: equityRaisedPercentages } };
    return this;
  }

  /** @param {Decimal[]} equityRaisedPercentages */
  equityRaisedPercentageNotIn(equityRaisedPercentages) {
    this.#query = { ...this.#query, equityRaisedPercentage: { $nin: equityRaisedPercentages } };
    return this;
  }

  /** @param {number} equityRaisedPercentage */
  equityRaisedPercentageGreaterThanOrEqual(equityRaisedPercentage) {
    this.#query = { ...this.#query, equityRaisedPercentage: { $gte: equityRaisedPercentage } };
    return this;
  }

    /** @param {number} min
     * @param {number} max
     */
  equityRaisedPercentageBetween(min, max) {
      this.#query = { ...this.#query, equityRaisedPercentage: { $gte: min, $lte: max } };
      return this;
  }

  /** @param {Decimal} debtRaisedPercentage */
  debtRaisedPercentageEqual(debtRaisedPercentage) {
    this.#query = { ...this.#query, debtRaisedPercentage: { $eq: debtRaisedPercentage } };
    return this;
  }

  /** @param {Decimal} debtRaisedPercentage */
  debtRaisedPercentageNotEqual(debtRaisedPercentage) {
    this.#query = { ...this.#query, debtRaisedPercentage: { $ne: debtRaisedPercentage } };
    return this;
  }

  /** @param {Decimal[]} debtRaisedPercentages */
  debtRaisedPercentageIn(debtRaisedPercentages) {
    this.#query = { ...this.#query, debtRaisedPercentage: { $in: debtRaisedPercentages } };
    return this;
  }

  /** @param {Decimal[]} debtRaisedPercentages */
  debtRaisedPercentageNotIn(debtRaisedPercentages) {
    this.#query = { ...this.#query, debtRaisedPercentage: { $nin: debtRaisedPercentages } };
    return this;
  }

  /** @param {Decimal} minInvestment */
  minInvestmentEqual(minInvestment) {
    this.#query = { ...this.#query, minInvestment: { $eq: minInvestment } };
    return this;
  }

  /** @param {Decimal} minInvestment */
  minInvestmentNotEqual(minInvestment) {
    this.#query = { ...this.#query, minInvestment: { $ne: minInvestment } };
    return this;
  }

  /** @param {Decimal[]} minInvestments */
  minInvestmentIn(minInvestments) {
    this.#query = { ...this.#query, minInvestment: { $in: minInvestments } };
    return this;
  }

  /** @param {Decimal[]} minInvestments */
  minInvestmentNotIn(minInvestments) {
    this.#query = { ...this.#query, minInvestment: { $nin: minInvestments } };
    return this;
  }

  /** @param {Decimal} maxInvestment */
  maxInvestmentEqual(maxInvestment) {
    this.#query = { ...this.#query, maxInvestment: { $eq: maxInvestment } };
    return this;
  }

  /** @param {Decimal} maxInvestment */
  maxInvestmentNotEqual(maxInvestment) {
    this.#query = { ...this.#query, maxInvestment: { $ne: maxInvestment } };
    return this;
  }

  /** @param {Decimal[]} maxInvestments */
  maxInvestmentIn(maxInvestments) {
    this.#query = { ...this.#query, maxInvestment: { $in: maxInvestments } };
    return this;
  }

  /** @param {Decimal[]} maxInvestments */
  maxInvestmentNotIn(maxInvestments) {
    this.#query = { ...this.#query, maxInvestment: { $nin: maxInvestments } };
    return this;
  }

  /** @param {boolean} hidden */
  hiddenEqual(hidden) {
    this.#query = { ...this.#query, hidden: { $eq: hidden } };
    return this;
  }

  /** @param {boolean} hidden */
  hiddenNotEqual(hidden) {
    this.#query = { ...this.#query, hidden: { $ne: hidden } };
    return this;
  }

  /** @param {boolean[]} hiddens */
  hiddenIn(hiddens) {
    this.#query = { ...this.#query, hidden: { $in: hiddens } };
    return this;
  }

  /** @param {boolean[]} hiddens */
  hiddenNotIn(hiddens) {
    this.#query = { ...this.#query, hidden: { $nin: hiddens } };
    return this;
  }

  /** @param {string} marketOverview */
  marketOverviewEqual(marketOverview) {
    this.#query = { ...this.#query, marketOverview: { $eq: marketOverview } };
    return this;
  }

  /** @param {string} marketOverview */
  marketOverviewNotEqual(marketOverview) {
    this.#query = { ...this.#query, marketOverview: { $ne: marketOverview } };
    return this;
  }

  /** @param {string[]} marketOverviews */
  marketOverviewIn(marketOverviews) {
    this.#query = { ...this.#query, marketOverview: { $in: marketOverviews } };
    return this;
  }

  /** @param {string[]} marketOverviews */
  marketOverviewNotIn(marketOverviews) {
    this.#query = { ...this.#query, marketOverview: { $nin: marketOverviews } };
    return this;
  }

  /** @param {string} waterfallSummary */
  waterfallSummaryEqual(waterfallSummary) {
    this.#query = { ...this.#query, waterfallSummary: { $eq: waterfallSummary } };
    return this;
  }

  /** @param {string} waterfallSummary */
  waterfallSummaryNotEqual(waterfallSummary) {
    this.#query = { ...this.#query, waterfallSummary: { $ne: waterfallSummary } };
    return this;
  }

  /** @param {string[]} waterfallSummarys */
  waterfallSummaryIn(waterfallSummarys) {
    this.#query = { ...this.#query, waterfallSummary: { $in: waterfallSummarys } };
    return this;
  }

  /** @param {string[]} waterfallSummarys */
  waterfallSummaryNotIn(waterfallSummarys) {
    this.#query = { ...this.#query, waterfallSummary: { $nin: waterfallSummarys } };
    return this;
  }

  /** @param {string} budgetVariance */
  budgetVarianceEqual(budgetVariance) {
    this.#query = { ...this.#query, budgetVariance: { $eq: budgetVariance } };
    return this;
  }

  /** @param {string} budgetVariance */
  budgetVarianceNotEqual(budgetVariance) {
    this.#query = { ...this.#query, budgetVariance: { $ne: budgetVariance } };
    return this;
  }

  /** @param {string[]} budgetVariances */
  budgetVarianceIn(budgetVariances) {
    this.#query = { ...this.#query, budgetVariance: { $in: budgetVariances } };
    return this;
  }

  /** @param {string[]} budgetVariances */
  budgetVarianceNotIn(budgetVariances) {
    this.#query = { ...this.#query, budgetVariance: { $nin: budgetVariances } };
    return this;
  }

  /** @param {string} scheduleTimelineVariance */
  scheduleTimelineVarianceEqual(scheduleTimelineVariance) {
    this.#query = { ...this.#query, scheduleTimelineVariance: { $eq: scheduleTimelineVariance } };
    return this;
  }

  /** @param {string} scheduleTimelineVariance */
  scheduleTimelineVarianceNotEqual(scheduleTimelineVariance) {
    this.#query = { ...this.#query, scheduleTimelineVariance: { $ne: scheduleTimelineVariance } };
    return this;
  }

  /** @param {string[]} scheduleTimelineVariances */
  scheduleTimelineVarianceIn(scheduleTimelineVariances) {
    this.#query = { ...this.#query, scheduleTimelineVariance: { $in: scheduleTimelineVariances } };
    return this;
  }

  /** @param {string[]} scheduleTimelineVariances */
  scheduleTimelineVarianceNotIn(scheduleTimelineVariances) {
    this.#query = { ...this.#query, scheduleTimelineVariance: { $nin: scheduleTimelineVariances } };
    return this;
  }

  /** @param {number} totalInvestors */
  totalInvestorsEqual(totalInvestors) {
    this.#query = { ...this.#query, totalInvestors: { $eq: totalInvestors } };
    return this;
  }

  /** @param {number} totalInvestors */
  totalInvestorsNotEqual(totalInvestors) {
    this.#query = { ...this.#query, totalInvestors: { $ne: totalInvestors } };
    return this;
  }

  /** @param {number[]} totalInvestorss */
  totalInvestorsIn(totalInvestorss) {
    this.#query = { ...this.#query, totalInvestors: { $in: totalInvestorss } };
    return this;
  }

  /** @param {number[]} totalInvestorss */
  totalInvestorsNotIn(totalInvestorss) {
    this.#query = { ...this.#query, totalInvestors: { $nin: totalInvestorss } };
    return this;
  }

  /** @param {number} totalInvestors */
  totalInvestorsLessThan(totalInvestors) {
    this.#query = { ...this.#query, totalInvestors: { $lt: totalInvestors } };
    return this;
  }

  /** @param {number} totalInvestors */
  totalInvestorsLessThanOrEqual(totalInvestors) {
    this.#query = { ...this.#query, totalInvestors: { $lte: totalInvestors } };
    return this;
  }

  /** @param {number} totalInvestors */
  totalInvestorsGreaterThan(totalInvestors) {
    this.#query = { ...this.#query, totalInvestors: { $gt: totalInvestors } };
    return this;
  }

  /** @param {number} totalInvestors */
  totalInvestorsGreaterThanOrEqual(totalInvestors) {
    this.#query = { ...this.#query, totalInvestors: { $gte: totalInvestors } };
    return this;
  }

  /** @param {number} totalInvestors */
  totalInvestorsBetween(totalInvestors, totalInvestors2) {
    this.#query = { ...this.#query, totalInvestors: { $gte: totalInvestors, $lte: totalInvestors2 } };
    return this;
  }

  /** @param {Decimal} averageInvestment */
  averageInvestmentEqual(averageInvestment) {
    this.#query = { ...this.#query, averageInvestment: { $eq: averageInvestment } };
    return this;
  }

  /** @param {Decimal} averageInvestment */
  averageInvestmentNotEqual(averageInvestment) {
    this.#query = { ...this.#query, averageInvestment: { $ne: averageInvestment } };
    return this;
  }

  /** @param {Decimal[]} averageInvestments */
  averageInvestmentIn(averageInvestments) {
    this.#query = { ...this.#query, averageInvestment: { $in: averageInvestments } };
    return this;
  }

  /** @param {Decimal[]} averageInvestments */
  averageInvestmentNotIn(averageInvestments) {
    this.#query = { ...this.#query, averageInvestment: { $nin: averageInvestments } };
    return this;
  }

  /** @param {Decimal} largestInvestment */
  largestInvestmentEqual(largestInvestment) {
    this.#query = { ...this.#query, largestInvestment: { $eq: largestInvestment } };
    return this;
  }

  /** @param {Decimal} largestInvestment */
  largestInvestmentNotEqual(largestInvestment) {
    this.#query = { ...this.#query, largestInvestment: { $ne: largestInvestment } };
    return this;
  }

  /** @param {Decimal[]} largestInvestments */
  largestInvestmentIn(largestInvestments) {
    this.#query = { ...this.#query, largestInvestment: { $in: largestInvestments } };
    return this;
  }

  /** @param {Decimal[]} largestInvestments */
  largestInvestmentNotIn(largestInvestments) {
    this.#query = { ...this.#query, largestInvestment: { $nin: largestInvestments } };
    return this;
  }

  /** @param {Decimal} smallestInvestment */
  smallestInvestmentEqual(smallestInvestment) {
    this.#query = { ...this.#query, smallestInvestment: { $eq: smallestInvestment } };
    return this;
  }

  /** @param {Decimal} smallestInvestment */
  smallestInvestmentNotEqual(smallestInvestment) {
    this.#query = { ...this.#query, smallestInvestment: { $ne: smallestInvestment } };
    return this;
  }

  /** @param {Decimal[]} smallestInvestments */
  smallestInvestmentIn(smallestInvestments) {
    this.#query = { ...this.#query, smallestInvestment: { $in: smallestInvestments } };
    return this;
  }

  /** @param {Decimal[]} smallestInvestments */
  smallestInvestmentNotIn(smallestInvestments) {
    this.#query = { ...this.#query, smallestInvestment: { $nin: smallestInvestments } };
    return this;
  }

  /** @param {Decimal} totalInvestment */
  totalInvestmentEqual(totalInvestment) {
    this.#query = { ...this.#query, totalInvestment: { $eq: totalInvestment } };
    return this;
  }

  /** @param {Decimal} totalInvestment */
  totalInvestmentNotEqual(totalInvestment) {
    this.#query = { ...this.#query, totalInvestment: { $ne: totalInvestment } };
    return this;
  }

  /** @param {Decimal[]} totalInvestments */
  totalInvestmentIn(totalInvestments) {
    this.#query = { ...this.#query, totalInvestment: { $in: totalInvestments } };
    return this;
  }

  /** @param {Decimal[]} totalInvestments */
  totalInvestmentNotIn(totalInvestments) {
    this.#query = { ...this.#query, totalInvestment: { $nin: totalInvestments } };
    return this;
  }

  /** @param {Date} investmentInformationUpdatedAt */
  investmentInformationUpdatedAtEqual(investmentInformationUpdatedAt) {
    this.#query = { ...this.#query, investmentInformationUpdatedAt: { $eq: investmentInformationUpdatedAt } };
    return this;
  }

  /** @param {Date} investmentInformationUpdatedAt */
  investmentInformationUpdatedAtNotEqual(investmentInformationUpdatedAt) {
    this.#query = { ...this.#query, investmentInformationUpdatedAt: { $ne: investmentInformationUpdatedAt } };
    return this;
  }

  /** @param {Date[]} investmentInformationUpdatedAts */
  investmentInformationUpdatedAtIn(investmentInformationUpdatedAts) {
    this.#query = { ...this.#query, investmentInformationUpdatedAt: { $in: investmentInformationUpdatedAts } };
    return this;
  }

  /** @param {Date[]} investmentInformationUpdatedAts */
  investmentInformationUpdatedAtNotIn(investmentInformationUpdatedAts) {
    this.#query = { ...this.#query, investmentInformationUpdatedAt: { $nin: investmentInformationUpdatedAts } };
    return this;
  }

  /** @param {Date} investmentInformationUpdatedAt */
  investmentInformationUpdatedAtLessThan(investmentInformationUpdatedAt) {
    this.#query = { ...this.#query, investmentInformationUpdatedAt: { $lt: investmentInformationUpdatedAt } };
    return this;
  }

  /** @param {Date} investmentInformationUpdatedAt */
  investmentInformationUpdatedAtLessThanOrEqual(investmentInformationUpdatedAt) {
    this.#query = { ...this.#query, investmentInformationUpdatedAt: { $lte: investmentInformationUpdatedAt } };
    return this;
  }

  /** @param {Date} investmentInformationUpdatedAt */
  investmentInformationUpdatedAtGreaterThan(investmentInformationUpdatedAt) {
    this.#query = { ...this.#query, investmentInformationUpdatedAt: { $gt: investmentInformationUpdatedAt } };
    return this;
  }

  /** @param {Date} investmentInformationUpdatedAt */
  investmentInformationUpdatedAtGreaterThanOrEqual(investmentInformationUpdatedAt) {
    this.#query = { ...this.#query, investmentInformationUpdatedAt: { $gte: investmentInformationUpdatedAt } };
    return this;
  }

  /** @param {Date} investmentInformationUpdatedAt */
  investmentInformationUpdatedAtBetween(investmentInformationUpdatedAt, investmentInformationUpdatedAt2) {
    this.#query = { ...this.#query, investmentInformationUpdatedAt: { $gte: investmentInformationUpdatedAt, $lte: investmentInformationUpdatedAt2 } };
    return this;
  }

  /** @param {boolean} lockEdit */
  lockEditEqual(lockEdit) {
    this.#query = { ...this.#query, lockEdit: { $eq: lockEdit } };
    return this;
  }

  /** @param {boolean} lockEdit */
  lockEditNotEqual(lockEdit) {
    this.#query = { ...this.#query, lockEdit: { $ne: lockEdit } };
    return this;
  }

  /** @param {boolean[]} lockEdits */
  lockEditIn(lockEdits) {
    this.#query = { ...this.#query, lockEdit: { $in: lockEdits } };
    return this;
  }

  /** @param {boolean[]} lockEdits */
  lockEditNotIn(lockEdits) {
    this.#query = { ...this.#query, lockEdit: { $nin: lockEdits } };
    return this;
  }

  /** @param {boolean} pendingCapitalCall */
  pendingCapitalCallEqual(pendingCapitalCall) {
    this.#query = { ...this.#query, pendingCapitalCall: { $eq: pendingCapitalCall } };
    return this;
  }

  /** @param {boolean} pendingCapitalCall */
  pendingCapitalCallNotEqual(pendingCapitalCall) {
    this.#query = { ...this.#query, pendingCapitalCall: { $ne: pendingCapitalCall } };
    return this;
  }

  /** @param {boolean[]} pendingCapitalCalls */
  pendingCapitalCallIn(pendingCapitalCalls) {
    this.#query = { ...this.#query, pendingCapitalCall: { $in: pendingCapitalCalls } };
    return this;
  }

  /** @param {boolean[]} pendingCapitalCalls */
  pendingCapitalCallNotIn(pendingCapitalCalls) {
    this.#query = { ...this.#query, pendingCapitalCall: { $nin: pendingCapitalCalls } };
    return this;
  }

  /** @param {boolean} allTranchesClosedForCapitalCall */
  allTranchesClosedForCapitalCallEqual(allTranchesClosedForCapitalCall) {
    this.#query = { ...this.#query, allTranchesClosedForCapitalCall: { $eq: allTranchesClosedForCapitalCall } };
    return this;
  }

  /** @param {boolean} allTranchesClosedForCapitalCall */
  allTranchesClosedForCapitalCallNotEqual(allTranchesClosedForCapitalCall) {
    this.#query = { ...this.#query, allTranchesClosedForCapitalCall: { $ne: allTranchesClosedForCapitalCall } };
    return this;
  }

  /** @param {boolean[]} allTranchesClosedForCapitalCalls */
  allTranchesClosedForCapitalCallIn(allTranchesClosedForCapitalCalls) {
    this.#query = { ...this.#query, allTranchesClosedForCapitalCall: { $in: allTranchesClosedForCapitalCalls } };
    return this;
  }

  /** @param {boolean[]} allTranchesClosedForCapitalCalls */
  allTranchesClosedForCapitalCallNotIn(allTranchesClosedForCapitalCalls) {
    this.#query = { ...this.#query, allTranchesClosedForCapitalCall: { $nin: allTranchesClosedForCapitalCalls } };
    return this;
  }

  $build() {
    return this.#query;
  }
}
