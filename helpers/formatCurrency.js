module.exports = function formatCurrency(nominal){
return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(nominal);
}