import os,json
years = ['2022','2023','2024']
months = ['January','February','March','April','May','June','July','August','September','October','November','December']
defaultCategories = [[('Income',False),('Housing',False),('Car - Gas',True),('Car - Maintenance',True),('Cat',True)],
                     [('Groceries',True),('Fast Food',True),('Sit Down',True),('Drinks',True)],
                     [('Woodworking - Tools',False),('Woodworking - Projects',False),('Car - Tools',True),('Car - mods',True),('Scale Models',False),('Electronics',True)],
                     [('Other',False)]]

def createBoards():
    output = []
    for y in years:
        for m in months:
            output.append({'name':m+'_'+y})

    with open('boards.json','w') as f :
        f.write(json.dumps(output))


def createLists(mongoBoardFileName):
    boardId = mongoBoardFileName
    output = []
    for y in ['2023']:#years:
        for m in ['August']:#months:
            for ind in range(len(defaultCategories)):
                pos = 1024
                for c in defaultCategories[ind]:
                    output.append({'boardId':boardId,'name':c[0],'hideChildren':c[1],'colNum':ind,'position':pos})
                    pos+=1024
                    
                
    print(output)

    with open('lists.json','w') as f :
        f.write(json.dumps(output))

createLists('64daf00055c5e14e486f4aec')
