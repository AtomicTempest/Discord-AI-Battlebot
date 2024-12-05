# Discord-AI-Battlebot

This is a simple Discord Bot I made using NodeJS and Javascript, that I later ported to Typescript. It has one command /battle which takes two names and an arena, then has fight commentator "Bob" simulate a battle between the two people using an LLM.

It uses the OpenAI library and can be configured to work with OpenAI's API or any local LLM program that mimics openAI's endpoints. I've been using LM Studio to run an LLM Locally.

The bot's output will vary wildly depending on what LLM model you use and has no built-in censoring or safety mechanisms. Used with an uncensored model it might produce **NSFW** or **Harmful material**. So use with caution.
The users command also directly modifies the prompt, so a user could creatively prompt to completely change or steer the output. So add to a public server at your own risk.

## Command Structure
Uses discord slash commands for easy command use.

`/battle {fighterone} {fightertwo} {arena} {scatteredweapons(True/False)} {associatedequipment(True/False)} {todeath(True/False)}`

## Requirements
- NodeJS
- Typescript
- discord.js
- openai

## Setup
install the requirements using npm

Edit `example_config.json` and add in your discord bots token, clientID and the guildID for the server you want it in. Then rename it to `config.json`.

Edit the BaseURL and apiKey in `modules/llm.ts` to match you LLM API. Uses a localhost server on port 1234 by default (The LM Studio Default)

Complile the Typescript using `tsc` and run using NodeJS. `index.js` is the program start.
## Warning
Not designed for use in a public server in current form. There are no safety features built-in to prevent content that violates Discord's Community Guidelines.







