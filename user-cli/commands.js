#!/usr/bin/env node
const program = require('commander');
const { prompt } = require('inquirer');
const { addUser, findUser, updateUser, removeUser, listUsers } = require('./index');

const questions = [
    {
        type: 'input',
        name: "firstname",
        message: 'User First Name'
    },
    {
        type: 'input',
        name: "lastname",
        message: 'User Last Name'
    },
    {
        type: 'input',
        name: "phone",
        message: 'User Phone Number'
    },
    {
        type: 'input',
        name: "email",
        message: 'User Email Address'
    },
    {
        type: 'input',
        name: "job",
        message: 'User Job Title'
    }
]

program
    .version('1.0.0')
    .alias('v')
    .description('User Management System');

// program
//     .command('add <firstname> <lastname> <phone> <email> <job>')
//     .alias('a')
//     .description('Add a user')
//     .action((firstname, lastname, phone, email, job) => {
//         addUser({firstname, lastname, phone, email, job})
//     });


// Add Command
program
    .command('add')
    .alias('a')
    .description('Add a user')
    .action( async () => {
        const answers = await prompt(questions);
        addUser(answers)
    })

// Find  Command
program
    .command('find <name>')
    .alias('f')
    .description('Find a user')
    .action((name) => {
        findUser(name)
    })

// Update Command
program
    .command('update <_id>')
    .alias('u')
    .description('Update a user')
    .action(async (_id) => {
        const answers = await prompt(questions);
        updateUser(_id, answers)
    })

// Remove Command
program
    .command('remove <_id>')
    .alias('r')
    .description('Remove a user')
    .action((_id) => {
        removeUser(_id)
    })

// List Command
program
    .command('list')
    .alias('l')
    .description('List all users')
    .action(() => {
        listUsers()
    })

program.parse(process.argv);