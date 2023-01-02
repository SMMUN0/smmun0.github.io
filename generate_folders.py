import os
import fileinput


year = input("Year which folders you want to create: ")

for committee  in fileinput.input(files ='./committees/'+year+'/committees.txt'):
    print(committee[0:-1])
    path = './committees/'+year+'/'+committee[0:-1]
    if(not os.path.exists(path)):
        os.mkdir(path)
    
    path += '/chair'
    if(not os.path.exists(path)):
        os.mkdir(path)
