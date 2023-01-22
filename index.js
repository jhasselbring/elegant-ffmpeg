const { execSync } = require('child_process');

class FFmpeg {

    constructor() {
        this.options = [];
        this.inputs = [];
        this.outputs = [];
        return this;
    }
    option(options) {
        this.options.push(` ${options}`);
        return this;
    }
    input(path, options = '') {
        this.inputs.push(`${options} "${path}"`);
        return this;
    }

    output(path, options = '') {
        this.outputs.push(`${options} "${path}"`);
        return this;
    }
    run(overwrite) {
        overwrite = overwrite ? '-y' : '';
        console.log('overwrite', overwrite);
        let command = 'ffmpeg';
        this.options.forEach(option => {
            command = `${command} ${option}`;
        });
        this.inputs.forEach(input => {
            command = `${command} -i ${input}`;
        });
        this.outputs.forEach(output => {
            command = `${command} ${overwrite} ${output}`;
        });
        console.log('command: ', command);
        return execSync(command, { maxBuffer: 1024 * 3000, encoding: "UTF-8" });
    }
}


module.exports = FFmpeg;