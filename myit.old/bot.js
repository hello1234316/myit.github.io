import axios from"axios";import fs from"fs";import{config}from"dotenv";import{createRequire}from"module";const require=createRequire(import.meta.url),bulletin=require("./data/bulletin.json");config({path:".env.local"});const Token=process.env.TOKEN,guild_id=808945802100736050n,channel_id=887690155027222598n,BASE_URL="https://discord.com/api/v9",limit=5;(async()=>{let{data:e}=await axios.get(`${BASE_URL}/channels/${channel_id}/messages?limit=5`,{headers:{Authorization:`Bot ${Token}`}}),{data:t}=await axios.get(`${BASE_URL}/guilds/${guild_id}/roles`,{headers:{Authorization:`Bot ${Token}`}}),{data:i}=await axios.get(`${BASE_URL}/guilds/${guild_id}/channels`,{headers:{Authorization:`Bot ${Token}`}});t=Object.fromEntries(t.map((e=>[e.id,e]))),i=Object.fromEntries(i.map((e=>[e.id,e])));let o=e.map((e=>{let o={};return e.mention_roles?.forEach((e=>e in t&&(o[e]=t[e]))),e.mention_channels||={},(e.content.match(/<#[0-9]+>/gm)||[]).map((e=>e.match(/[0-9]+/)?.[0])).filter((e=>e)).forEach((t=>t in i&&(e.mention_channels[t]=i[t]))),e.mention_roles=o,e}));bulletin?.[0]?.timestamp===o?.[0]?.timestamp&&bulletin?.[0]?.edited_timestamp===o?.[0]?.edited_timestamp||fs.writeFile("data/bulletin.json",JSON.stringify(o),(e=>console.log(e)))})();
