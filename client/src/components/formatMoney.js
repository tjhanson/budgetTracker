

export const formatMoneyUS = (val) => {
    let price =  new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });
    return price.format(val)
}