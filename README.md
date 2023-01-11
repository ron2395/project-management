# project-management
The below information aims to explain the basic installation for this webapp. Please go through it to avoid any issues.

<h1>Project management-x</h1>
<h4>A simple project management tool</h4>

<p>- Steps to run -</p>
<ul>
<li>clone git repository</li>
<li>In the root directory</li>
<li>Run command: npm i</li>
<li>Navigate to /frontend</li>
<li>Run command: npm i</li>
<li>This will install all dependencies</li>
<li>Go to next section</li>
</ul>

<h4>Env variables</h4>
<p>- create .env file in root directory of the project and add these variables -</p>
<ul>
<li>MONGO_URI = your_mongo_connection_string</li>
<li>PORT = port_of_your_choice</li>
<li>JWT_SECRET = your_choice</li>
</ul>

<h4>User seeder</h4>
<p>- Only admin can add users -</p>
<p>- This will create the first admin user for you -</p>
<ul>
<li>In the root directory of project</li>
<li><b>!Warning: Following will delete all existing users</b></li>
<li>Run command: npm run seeder</li>
</ul>

<h4>Running the webapp</h4>
<ul>
<li>In the root directory</li>
<li>Run command: npm run dev</li>
<li>Done</li>
</ul>

<h5>Credentials for first login</h5>
<ul>
<li>email: admin@test.com</li>
<li>password: 12345678</li>
<li>Please change your password post first login</li>
</ul>