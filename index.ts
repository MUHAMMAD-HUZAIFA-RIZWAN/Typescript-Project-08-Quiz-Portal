#!/usr/bin/env node
import inquirer from 'inquirer';
import chalk from 'chalk';
import chalkAnimation from 'chalk-animation';

const sleep =()=>{
    return new Promise((res)=>{
        setTimeout(res, 2000)
    })
}
async function welcome(){
    let rainbowTitle= chalkAnimation.neon(" WELCOME TO THE QUIZ PORTAL BY RIZ !!!");
    await sleep();
    rainbowTitle.stop();
   
}
await welcome()

interface Question {
  text: string;
  choices: string[];
  correctAnswer: string;
}

async function startQuiz(): Promise<void> {
  

  const student = await inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'Enter your name:'
    }
  ]);

  const rollNumber = generateRandomRollNumber();

  console.log (chalk.bgGreenBright(`Student Name: ${student.name}`));
  console.log (chalk.bgGreenBright(`Roll Number: ${rollNumber}\n`));

  const questions: Question[] = [
    {
      text: 'Node.js is written in which language?',
      choices: ['C++', 'Python', 'Javascript', 'C#'],
      correctAnswer: 'Javascript'
    },
    {
      text: 'How can we expose node modules?',
      choices: ['exports', 'imports', 'require', 'expose'],
      correctAnswer: 'exports'
    },
    {
      text: 'How many node objects methods are available?',
      choices: ['17', '21', '18', '19'],
      correctAnswer: '18'
    },
    {
        text: 'What is the full form of npm?',
        choices: ['Node Project Manager', 'Node Package Manager', 'New Project Manager'],
        correctAnswer: 'Node Package Manager'
      }
  ];


  let score = 0;

  for (const question of questions) {
    const { answer } = await inquirer.prompt([
      {
        type: 'list',
        name: 'answer',
        message: question.text,
        choices: question.choices
      }
    ]);

    if (answer === question.correctAnswer) {
      console.log (chalk.bgGreenBright('Correct answer!\n'));
      score++;
    } else {
      console.log (chalk.bgRedBright('Wrong answer!\n'));
    }
  }

  console.log (chalk.bgBlueBright('Quiz Completed!\n'));
  console.log (chalk.bgBlueBright(`Student Name: ${student.name}`));
  console.log (chalk.bgBlueBright(`Roll Number: ${rollNumber}`));
  console.log (chalk.bgBlueBright(`Score: ${score}/${questions.length}`));
}

function generateRandomRollNumber(): string {
  const min = 10000;
  const max = 99999;
  return (Math.floor(Math.random() * (max - min + 1)) + min).toString();
}

startQuiz();
