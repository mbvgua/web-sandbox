* for Flask
   ```sh

    admin@fedora:~$ source .flaskVenv/bin/activate
    (.flaskVenv) admin@fedora:~$ python -m flask --version
    # -> Python 3.10.14
    # -> Flask 3.0.3
    # -> Werkzeug 3.0.2

   ```

   > Remember that its is always a good practice develop in a virtual environment to prevent possible breakage with future updates.
### Installation :hammer:

 Now that you have the main dependencies installed locally, you can download the repository and run the desired project.

 1. Clone the repo
    ```sh
    git clone https://github.com/mbvguadouglas/web-sandbox.git
    ```
 2. Navigate to the project folder
    ```sh
    cd web-sandbox
    ```
 3. Install the needed requirements located in the `requirements.txt` file
    ```sh
    pip install -r requirements.txt
    ```
 4. Run the desired project. This will either be using flask or django, hence is better outlined in the individual project's `README.md`

 <p align="right">(<a href="#readme-top">back to top</a>)</p>