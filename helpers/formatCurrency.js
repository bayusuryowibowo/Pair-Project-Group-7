module.exports = function formatCurrency(nominal){
return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(nominal);
}