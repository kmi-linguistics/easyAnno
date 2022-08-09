
### Run on local machine
***

0. Setup mongodb
    ```
    sudo apt-get install mongodb

    mongod --version

    sudo systemctl status mongodb
    ```
1. clone repository
    ```
    git clone https://github.com/kmi-linguistics/easyAnno.git
    ```
2.  cd to folder name(repo name)
    ```
    cd easyAnno
    ```
3. create python virtual environment(venv) 
    ```
    python3 -m venv venv
    ```  
4. activate python virtual environment(venv) 
    ```
    source venv/bin/activate
    ```
5. install all dependencies from requirements.txt
    ```
    pip install requirements.txt
    ```
6. install tesseract
    - https://linuxhint.com/install-tesseract-ocr-linux/
    - https://www.linux.com/training-tutorials/using-tesseract-ubuntu/
    - https://pypi.org/project/pytesseract/   

7. run the application
    ```
    flask run
    ```
8. In browser address bar
    ```
    127.0.0.1:5000
    ```
9. view mongodb in GUI: install mongodb compass (not working in azure VM)
    - https://www.digitalocean.com/community/tutorials/how-to-use-mongodb-compass
    - mongodb from terminal
    https://docs.mongodb.com/manual/tutorial/getting-started/       