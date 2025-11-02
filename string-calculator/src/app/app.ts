import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css'
})
export class App {
  
  sumValue = 0;
  inputString = "";

  buttonSubmit(){
    this.sumValue = this.calculate(this.inputString.replace(/\\n/g, '\n'));
  }

  /**
   * Description: Calculates the sum of numbers in given string
   * @param inputString 
   * @returns 
   */
  calculate(inputString: string): number {
     if (!inputString) return 0;

    var separators: RegExp = /,|\n/;
    var numbers = inputString;

    if (inputString.startsWith("//")) {
      const separatorEnd = inputString.indexOf("\n");
      const customSeparator = inputString.substring(2, separatorEnd);
      const escapedDelimiter = customSeparator.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      separators = new RegExp(`${escapedDelimiter}|\n`);
      numbers = inputString.substring(separatorEnd + 1);
    }

    const t = numbers.split(separators);
    const n: number[] = [];

    const sum = t.reduce((acc, token) => {
      const num = parseInt(token, 10);
      if (isNaN(num)) return acc;
      if (num < 0) n.push(num);
      return acc + num;
    }, 0);

    if (n.length > 0) {
      throw new Error(`negative numbers not allowed ${n.join(",")}`);
    }

    return sum;
  }

}
