import fs from 'fs';

const removeTmp = (path: string) => {
	fs.unlink(path, err => {
		if (err) throw err;
	});
};

export { removeTmp };
