import validate from '../../lib/vera/util/validate'

export function  validCouponNumber (val) {
    var emptyValid = validate.lenMN(val, 1, 20).result;
    return emptyValid;
}