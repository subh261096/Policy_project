const fields = {
  body_injury_liability: "Body Injury Liability",
  collision: "collision",
  comprehensive: "Comprehensive",
  customer_gender: "Gender",
  customer_id: "Customer Id",
  customer_income_group: "Income Group",
  customer_marital_status: "Marital Status",
  customer_region: "Region",
  date_of_purchase: "Date of Purchase",
  fuel: "Fuel",
  personal_injury_protection: "Injury Protection",
  policy_id: "Policy Id",
  premium: "Premium",
  property_damage_liability: "Property Damage Liability",
  vehicle_Segment: "Vehicle Segment",
};

const formatBooleanValues = (value) => {
  if (value) return "Yes";
  return "No";
};

const formatDate = (date) => {
  let result = date.toString().split(",");
  if (result.length === 1) {
    return result[0];
  } else {
    return result[1].split("00")[0];
  }
};

const formatMaritalStatus = (value) => {
  if (value) return "Married";
  return "Unmarried";
};

module.exports = {
  fields,
  formatBooleanValues,
  formatDate,
  formatMaritalStatus,
};
