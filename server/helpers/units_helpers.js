const UnitsHelper = {}


UnitsHelper.mgPerDeciLiter = (num) => `${num} mg/dl`;
UnitsHelper.cm = (num) => `${num} cm`;
UnitsHelper.years = (num) => `${num} years`;
UnitsHelper.kg = (num) => `${num} kg`;

UnitsHelper.unitsWrapper = (measurement, num) => {
    let unit = UnitsHelper.units(measurement);
    return `${num} ${unit}`;

};
UnitsHelper.units = (measurement) => {
    let unit;
    switch (measurement) {
        case 'weight':
            unit = "kg";
            break;
        case 'height':
            unit = "cm";
            break;
        case 'age':
            unit = 'years';
            break;
        default:
            break;
    }
    return unit;

};



module.exports = UnitsHelper;
