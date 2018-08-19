//сообщения системы
module.exports = {
    sitename: "Spaceindex",
    bigImage: "Very big image! (2 mb max)", 
    notImage: "Uploaded file not image!",
    addMsg: "Add article",
    editMsg: "Edit article",
    about: "About",
    searchTitle: "Planets or moons finded:",
    notFound: "Nothing found",
    success: "Admin created!",
    passLengthHint(length){return `Password must be not less than ${length} symbols!`},
    enterLogPass: "Enter login and password!",
    alreadyInst: "Admin account was already installed!",
    enterLogin: "Enter login!",
    enterPass: "Enter password!",
    noAuth: "Enter valid login and password, please!",
    bodyTitle: "Planet or moon must have a title!",
    bodyDescr: "Please, describe this planet or planetoid!",
    defaultWater: 'No water',
    enumWater: ['No water', 'Some water', 'Water world'],
    defaultRadiation: 'Middle',
    enumRadiation: ['Low', 'Middle', 'High']
}