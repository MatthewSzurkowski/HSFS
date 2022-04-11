from sre_constants import SUCCESS
from flask import Flask, jsonify, send_file
from flask import request, send_file
import json
import os
import subprocess
from os import listdir, walk
from os.path import isfile, join
import moment
import datetime as dt
import shutil
from werkzeug.utils import secure_filename

app = Flask(__name__)

@app.route("/")
def hello():
    return "<h1 style='color:green'>Welcome to the API!</h1>"

@app.route("/update", methods = ['POST'])
def update():
    # print("test")
    # print(request.data)
    json_data = json.loads(str(request.data, encoding='utf-8'))
    branchName = json_data["ref"]
    print("Branch name:")
    print(branchName)
    chop = branchName.split('/')
    branchName = (chop[len(chop)-1])
    if (branchName == "master"):
        directory = os.getcwd()
        directory = (directory + "/nginxConfig.sh")
        subprocess.run([directory])
        return jsonify(success='true')
    else:
        return jsonify(success='false')

@app.route("/createFolder", methods = ['POST'])
def createFolder():
    try:
        json_data = json.loads(str(request.data, encoding='utf-8'))
        folderName = json_data["folderName"]
        os.mkdir(( "../root-drive/" + folderName))
        return jsonify(success='true')
    except:
        return jsonify(success='false')

@app.route("/deleteFile", methods = ['POST'])
def deleteFile():
    try:
        json_data = json.loads(str(request.data, encoding='utf-8'))
        filesToRemove = json_data["fileToRemove"]
        for file in filesToRemove:
             os.remove(("../root-drive/" + file))
        return jsonify(success='true')
    except:
        return jsonify(success='false')

@app.route("/deleteFolder", methods = ['POST'])
def deleteFolder():
    try:
        json_data = json.loads(str(request.data, encoding='utf-8'))
        folderToRemove = json_data["folderToRemove"]
        for folder in folderToRemove:
            shutil.rmtree(("../root-drive/" + folder))
        return jsonify(success='true')
    except:
        return jsonify(success='false')

@app.route("/fileInfo", methods = ['GET'])
def fileInfo():
    f = []
    for (dirpath, dirnames, filenames) in walk("../root-drive"):
        if (len(dirnames)!=0):
            for dirname in dirnames:
                newFileObj = {}
                realPath = dirpath
                dirpath = dirpath.split('/')
                if ("..") in dirpath:
                    dirpath.remove("..")
                if ("root-drive") in dirpath:
                    dirpath.remove("root-drive") 
                dirpath = '/'.join(dirpath)
                newFileObj["key"] = (dirpath + '/' + dirname + '/')
                dirpath = realPath
                newFileObj["size"] = os.path.getsize((dirpath + '/' + dirname))
                f.append(newFileObj)
            
        if (len(filenames)!=0):
            for file in filenames:
                newFileObj = {}
                realPath = dirpath
                dirpath = dirpath.split('/')
                if ("..") in dirpath:
                    dirpath.remove("..")
                if ("root-drive") in dirpath:
                    dirpath.remove("root-drive")
                dirpath = '/'.join(dirpath)
                newFileObj["key"] = (dirpath + '/' + file)
                dirpath = realPath
                newFileObj["size"] = os.path.getsize((dirpath + '/' + file))
                f.append(newFileObj)
    try:
        for obj in f:
            hold = obj["key"].split('/')
            if (hold[len(hold)-1] == ".DS_Store"):
                f.remove(obj)
    except:
        pass
    return json.dumps(f, indent=4, sort_keys=True, default=str)


@app.route("/folderInfo", methods = ['GET'])
def folderInfo():
    f = []
    i = 0
    for (dirpath, dirnames, filenames) in walk("../root-drive"):
        if (len(dirnames)!=0):
            for dirname in dirnames:
                newFileObj = {}
                realPath = dirpath
                dirpath = dirpath.split('/')
                if ("..") in dirpath:
                    dirpath.remove("..")
                if ("root-drive") in dirpath:
                    dirpath.remove("root-drive") 
                dirpath = '/'.join(dirpath)
                newDirName = (dirpath + '/' + dirname)
                if (newDirName[0]!='/'):
                    newDirName = ("/" + newDirName)
                newFileObj["value"] = newDirName
                dirpath = realPath
                newFileObj["key"] = i
                i = i + 1
                f.append(newFileObj)
    try:
        for obj in f:
            hold = obj["key"].split('/')
            if (hold[len(hold)-1] == ".DS_Store"):
                f.remove(obj)
    except:
        pass
    return json.dumps(f, indent=4, sort_keys=True, default=str)
    # return jsonify(files=f)

@app.route("/upload", methods = ['GET', 'POST'])
def uploadFiles():
    if request.method == 'POST':
        file = request.files['file']
        folderLocation = "../root-drive" + request.form.get("location")
        # print(request.form.get("location"))
        filename = secure_filename(file.filename)
        file.save(os.path.join(folderLocation,filename))
        return jsonify(success="success")
    else:
        return "<h1 style='color:green'>hi</h1>"

@app.route("/getFileInfo", methods = ['GET'])
def getFileInfo():
    f = []
    i = 0
    for (dirpath, dirnames, filenames) in walk("../root-drive"):
        if (len(filenames)!=0):
            for file in filenames:
                newFileObj = {}
                realPath = dirpath
                dirpath = dirpath.split('/')
                if ("..") in dirpath:
                    dirpath.remove("..")
                if ("root-drive") in dirpath:
                    dirpath.remove("root-drive")
                dirpath = '/'.join(dirpath)
                if (dirpath[0]!='/'):
                    dirpath = ("/" + dirpath)
                newFileObj["key"] = i
                newFileObj["value"] = (dirpath + '/' + file)
                dirpath = realPath
                newFileObj["size"] = os.path.getsize((dirpath + '/' + file))
                f.append(newFileObj)
                i = i + 1
    try:
        for obj in f:
            hold = obj["key"].split('/')
            if (hold[len(hold)-1] == ".DS_Store"):
                f.remove(obj)
    except:
        pass
    return json.dumps(f, indent=4, sort_keys=True, default=str)

    # app.config['UPLOAD_FOLDER'] = json_data["foldername"];
    
    # f = request.files['file']
    # f.save(secure_filename(f.filename))

@app.route('/root-drive/<path:path>')
def sendFile(path):
    print(path)
    if (path[0]!='/'):
        path = ('/' + path)
    try:
        return send_file(('../root-drive' + path))
    except Exception as e:
        return str(e)

@app.route('/favicon')
def sendFav():
    try:
        return send_file(('../public/favicon.ico'))
    except Exception as e:
        return str(e)

@app.route('/applefav')
def sendAppleFav():
    try:
        return send_file(('../public/logo192.png'))
    except Exception as e:
        return str(e)

@app.route('/fileRename', methods = ['POST'])
def fileRename():
    try:
        json_data = json.loads(str(request.data, encoding='utf-8'))
        old = json_data["old"]
        new = json_data["new"]
        
        # print("Old:" + old)
        # print("New:" + new)

        root_base = "../root-drive"

        new = (root_base + '/' + new)
        old = (root_base + '/' + old)
        os.rename(old, new)
        return jsonify(success='true')
    except:
        print("Error in fileRename")
        return jsonify(success='false')





if __name__ == "__main__":
    app.run(host='0.0.0.0')

