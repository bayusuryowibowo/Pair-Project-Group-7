const dayjs = require("dayjs")

module.exports = function formatDate(date){
return dayjs(date).format('ddd MMM YYYY HH:mm A ')
}