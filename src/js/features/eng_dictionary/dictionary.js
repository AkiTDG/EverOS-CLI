/*
 * This feature uses the full OPTED (Online Plain Text English Dictionary) version,
 * which is based on the 1913 edition of Webster’s Unabridged Dictionary.
 *
 * Source: Project Gutenberg and related public domain initiatives.
 * License: Public Domain – freely available for use, distribution, and modification.
 *
 * OPTED is a public domain English word list compiled to provide a comprehensive,
 * open resource for developers, linguists, and educational projects.
 *
 * No copyright restrictions apply.
 */

import { supabase } from './eng_dictionarycnfig.js';  

function wrapTextIndented(text, maxWidth = 90, indent = 12) {
  const words = text.split(' ');
  let line = '';
  let wrapped = `"`;
  const indentStr = ' '.repeat(indent);

  for (const word of words) {
    if ((line + word).length > maxWidth - indent) {
      wrapped += line.trim() + '<br>' + indentStr;
      line = '';
    }
    line += word + ' ';
  }

  wrapped += line.trim() + `"`;
  return wrapped;
}

/**
 * 
 * @param {string} Word 
 * @param {function} writeToConsole 
 */
export async function dictionary(Word, writeToConsole) {
  if (!Word) {
    writeToConsole("Please type a word to look up.");
    return;
  }

  const { data, error } = await supabase
    .from('dictionary')
    .select('"Word", "POS", "Definition"')
    .ilike('"Word"', Word);  

  if (error) {
    writeToConsole("Error fetching word: " + error.message);
    return;
  }

  if (!data || data.length === 0) {
    writeToConsole(`No definition found for "${Word}".`);
    return;
  }

  data.forEach(entry => {
    writeToConsole(`<br>Word: ${entry.Word}`);
    if (entry.POS) {
      writeToConsole(`Part of Speech: ${entry.POS}`);
    }
    if (entry.Definition) {
      writeToConsole(`Definition: ${wrapTextIndented(entry.Definition)}`);
    }
    writeToConsole('------------------------');
  });
}
export const engUI = `
  _____             _ _     _                     
 | ____|_ __   __ _| (_)___| |__                  
 |  _| | '_ \\ / _\` | | / __| '_ \\                 
 | |___| | | | (_| | | \\__ \\ | | |                
 |_____|_| |_|\\__, |_|_|___/_| |_|                
  ____  _     |___/_                              
 |  _ \\(_) ___| |_(_) ___  _ __   __ _ _ __ _   _ 
 | | | | |/ __| __| |/ _ \\| '_ \\ / _\` | '__| | | |
 | |_| | | (__| |_| | (_) | | | | (_| | |  | |_| |
 |____/|_|\\___|\\__|_|\\___/|_| |_|\\__,_|_|   \\__, |
                                            |___/ 

+-----------------------------------------------+
|===============================================|
|      Online Plain Text English Dictionary     |
|                                               |
| <== Operations ==>                            |
| [Type any word]                               |
| [For suffixes: use parentheses, e.g. (-ness)] |
|===============================================|
+-----------------------------------------------+
`
