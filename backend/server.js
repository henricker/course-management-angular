import fs from 'fs/promises';
import cors from 'cors';

async function getCourses() {
    const data = await fs.readFile("./data/data.json", { encoding: 'utf-8' });
    return JSON.parse(data)['courses'];
}

async function getCourseById(id) {
    const data = await fs.readFile("./data/data.json", { encoding: 'utf-8' });
    return JSON.parse(data)['courses'].find(course => course.id === id);   
}

async function saveCourse(course) {
    const data = await fs.readFile("./data/data.json", { encoding: 'utf-8'});
    const courses = JSON.parse(data)['courses'];

    courses['courses'].push(course);

    await fs.writeFile('./data/data.json', courses);
    return course;
}

async function updatedCourse(course, id) {
    const coursesBuffer = await fs.readFile("./data/data.json", { encoding: 'utf-8' });
    const courses = JSON.parse(coursesBuffer);

    const index = courses['courses'].findIndex(courseIterator => courseIterator.id === id);
    courses['courses'][index] = course;

    await fs.writeFile('./data/data.json', JSON.stringify(courses, null, 2));

    return course;
}

async function deleteById(id) {
    const coursesBuffer = await fs.readFile("./data/data.json", { encoding: 'utf-8' });
    let courses = JSON.parse(coursesBuffer);

    courses['courses'] = courses['courses'].filter(courseIterator => courseIterator.id !== id);
    await fs.writeFile('./data/data.json', JSON.stringify(courses, null, 2));
}

const server = express();
server.use(cors());
server.use(express.json());

server.get('/courses', async (request, response) => {
    return response.json(await getCourses());
});

server.get('/courses/:id', async (request, response) => {
    return response.json(await getCourseById(Number.parseInt(request.params['id'])));
});

server.post('/courses', async (request, response) => {
    const body = request.body;
    return response.json(await saveCourse(body));
});

server.put('/courses/:id', async (request, response) => {
    const body = request.body;
    const id = Number.parseInt(request.params['id']);
    return response.json(await updatedCourse(body, id));
});

server.delete('/courses/:id', async (request, response) => {
    const id = Number.parseInt(request.params['id']);
    deleteById(id);
    return response.json({ message: "deleted with success!" });
});

server.listen(3333, () => console.log("Listening on port 3333"));