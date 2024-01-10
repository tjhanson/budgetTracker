import os,json
years = ['2022','2023','2024']
months = ['January','February','March','April','May','June','July','August','September','October','November','December']
defaultCategories = [[('Income',False),('Housing',False),('Car - Gas',True),('Car - Maintenance',True),('Cat',True)],
                     [('Groceries',True),('Fast Food',True),('Sit Down',True),('Drinks',True)],
                     [('Woodworking - Tools',False),('Woodworking - Projects',False),('Car - Tools',True),('Car - Mods',True),('Scale Models',False),('Electronics',True)],
                     [('Other',False)]]
defaultCards = ['rent','water','electric','gas','internet']

def createBoards():
    output = []
    for y in years:
        for m in months:
            output.append({'name':m+'_'+y})

    with open('boards.json','w') as f :
        f.write(json.dumps(output))


def createLists(mongoBoardFileName):
    boards = json.loads(open(mongoBoardFileName).read())
    output = []
    for i in boards:
        boardId = i['_id']['$oid']
        for ind in range(len(defaultCategories)):
            pos = 1024
            for c in defaultCategories[ind]:
                output.append({'boardId':boardId,'name':c[0],'hideChildren':c[1],'colNum':ind,'position':pos})
                pos+=1024
    with open('lists.json','w') as f :
        f.write(json.dumps(output))

def createCards(mongoListFileName):
    lists = json.loads(open(mongoListFileName).read())
    output = []
    for i in lists:
        if (i['name'] == "Car - Maintenance"):
            listId = i['_id']['$oid']
            output.append({'listId':listId,'name':'insurance','position':1024,'amount':0})
        elif(i['name'] == "Income"):
            listId = i['_id']['$oid']
            position = 1024
            for i in [1,1]:
                output.append({'listId':listId,'name':'fuscoe','position':position,'amount':0})
                position+=1024
    with open('cards.json','w') as f :
        f.write(json.dumps(output))
                


        
createCards('./listsForCards.json')
