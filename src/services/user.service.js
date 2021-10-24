import contactService from './contacts.service'
import utilService from './utils'

init()

function init() {
    localStorage.setItem('users', JSON.stringify([
        {
            _id: utilService.makeId(),
            email: 'admin@admin.com',
            password: '1234',
            name: 'Admin',
            balance: 100,
            isAdmin: true,
            moves: []
        },
        {
            _id: utilService.makeId(),
            email: 'user@user.com',
            password: '1234',
            name: 'User',
            balance: 100,
            isAdmin: false,
            moves: []
        }
    ]))
}

function login(cred) {
    let users = localStorage.getItem('users')
    if (!users) init()
    users = JSON.parse(users)
    const user = users.filter(user => {
        return user.email === cred.email && user.password === cred.password
    })

    if (user) {
        sessionStorage.setItem('loggedInUser', JSON.stringify(user))
    } else sessionStorage.clear('loggedInUser')

}

function signup(user) {
    let users = localStorage.getItem('users')
    if (!users) init()
    users = JSON.parse(users)
    users.push({ ...user, balance: 100, isAdmin: false })
    localStorage.setItem('users', JSON.stringify(users))
}

function logout() {
    sessionStorage.clear('loggedInUser')
}

function getLoggedInUser() {
    const loggedInUser = sessionStorage.getItem('loggedInUser')
    return loggedInUser ? JSON.parse(loggedInUser)[0] : null
}


async function transferFund(amount, to) {
    const loggedInUser = getLoggedInUser();
    if (loggedInUser.balance < amount || amount <= 0) return
    to.balance += amount
    await contactService.update(to)
    loggedInUser.balance -= amount
    loggedInUser.moves.push({ amount, date: Date.now(), to:to._id,id:utilService.makeId() })
    update(loggedInUser)
    sessionStorage.setItem('loggedInUser', JSON.stringify([loggedInUser]))

}

function update(user) {
    let users = localStorage.getItem('users')
    users = JSON.parse(users)
    if (users) {
        const idx = users.findIndex(currUser => currUser._id === user._id)
        users[idx] = user
        localStorage.setItem('users', JSON.stringify(users))
    }

}
export default {
    login,
    signup,
    logout,
    getLoggedInUser,
    transferFund
}