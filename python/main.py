import random
import json

def main():
    # INPUTS: 1.  N (int): -> Crossword Puzzle grid is N x N (square)
    #         2.  answerBank (str) -> List of crossword answers
    #
    # OUTPUTS 1.  crosswordGlossary (dict) -> A dictionary composed of KEYS (clue numeric index),
    #             and VALUES (lists) organized like [row index, col index, answer, orientation]


    N = 20
    answerBank = ['Elephant','Buffalo','Colorado','Panda','Bear','Engineer','Overwatch','Valheim','Jeopardy']
    
    crossword, indexDict = generate_crossword(size=N,answerBank=answerBank)

    [element.append('DOWN') for element in indexDict['DOWN']]
    [element.append('ACROSS') for element in indexDict['ACROSS']]

    tempList = list()
    [tempList.append(element) for element in indexDict['DOWN']]
    [tempList.append(element) for element in indexDict['ACROSS']]
    tempList.sort()

    crosswordGlossary = dict()
    for elementIdx, element in enumerate(tempList):
        crosswordGlossary[elementIdx+1] = element

    json_string = json.dumps(crosswordGlossary)
    print(json_string)
    # Send out the glossary with json
    for row in crossword:
        print(' '.join(row))
    


def generate_crossword(size=20,answerBank=None):
    answerBank = [element.upper() for element in answerBank]
    skippedAnswerBank = list() # TODO

    indexDict = {'DOWN': [], 'ACROSS': []}

    grid = [[' ']*size for _ in range(size)]
    random.shuffle(answerBank)
    rowSeed = random.randint(0,(size-len(answerBank[0]))//2)
    colSeed = random.randint(0,(size-len(answerBank[0]))//2)
    randBool = random.randint(0,1)

    # General loop after first word is placed
    firstWordCanBePlaced = word_can_be_placed(size=size,word=answerBank[0], grid=grid, rowStart=rowSeed, colStart=colSeed, is_horizontal=randBool)
    if firstWordCanBePlaced:
        grid = place_word_in_grid(size=size,word=answerBank[0], grid=grid, rowStart=rowSeed, colStart=colSeed, is_horizontal=randBool)
    else:
        return generate_crossword(size=size,answerBank=answerBank)
    
    for word in answerBank[1:]:
        # Proceed to check against all words in sequence within answerBank, but if one word in sequence doesn't work, we should check the next
        # At the end, we should loop back-around to the remaining words (that got skipped) and see if they will fit in the resultant puzzle
        thisWordIsPlaced = False
        for rowIdx in range(size):
            for colIdx in range(size):
                for letterIdx, letter in enumerate(word):
                    # Loop over all letters in this word, determine whether any matches exist
                    # For EACH match, check whether word can be placed horizontally or vertically with reference letter
                    if letter == grid[rowIdx][colIdx]:
                        if word_can_be_placed(size=size,word=word, grid=grid, rowStart=rowIdx, colStart=colIdx-letterIdx, is_horizontal=True):
                            grid = place_word_in_grid(size=size, word=word, grid=grid, rowStart=rowIdx, colStart=colIdx-letterIdx, is_horizontal=True)
                            thisWordIsPlaced = True
                            indexDict['ACROSS'].append([rowIdx,colIdx-letterIdx,word])
                            break
                        elif word_can_be_placed(size=size,word=word, grid=grid, rowStart=rowIdx-letterIdx, colStart=colIdx, is_horizontal=False):
                            grid = place_word_in_grid(size=size, word=word, grid=grid, rowStart=rowIdx-letterIdx, colStart=colIdx, is_horizontal=False)
                            thisWordIsPlaced = True
                            indexDict['DOWN'].append([rowIdx-letterIdx,colIdx,word])
                            break
                if thisWordIsPlaced:
                    break
            if thisWordIsPlaced:
                break
        if not thisWordIsPlaced:
            return generate_crossword(size=size,answerBank=answerBank)
            
    return grid, indexDict

def word_can_be_placed(size, word, grid, rowStart, colStart, is_horizontal):
    if rowStart not in range(size) or colStart not in range(size):
        return False
         
    for letterIdx, letter in enumerate(word):
        if is_horizontal:
            # Ensure each letter is placed in-bounds
            if colStart + letterIdx not in range(size):
                return False

            # Ensure empty (or exterior) nodes to the left + right of the word
            if (letterIdx == 0 and colStart - 1 >= 0 and grid[rowStart][colStart - 1] not in [' ']) \
            or (letterIdx == len(word)-1 and colStart + letterIdx + 1 <= size and grid[rowStart][colStart + letterIdx + 1] not in [' ']):
                return False

            # Ensure each letter is placed on an empty or equal-letter square
            if grid[rowStart][colStart+letterIdx] not in [' ',letter]:
                return False

            # Ensure there are no other horizontal words placed above/below
            if (letter != grid[rowStart][colStart+letterIdx] and rowStart+1<=size and grid[rowStart+1][colStart+letterIdx] not in [' ']) \
            or (letter != grid[rowStart][colStart+letterIdx] and rowStart-1>=0 and grid[rowStart-1][colStart+letterIdx] not in [' ']):
                return False

        else: # If vertical
            # Ensure each letter is placed in-bounds
            if rowStart + letterIdx not in range(size):
                return False

            # Ensure empty (or exterior) nodes to the top + bottom of the word
            if (letterIdx == 0 and rowStart - 1 >= 0 and grid[rowStart - 1][colStart] not in [' ']) \
            or (letterIdx == len(word)-1 and rowStart + letterIdx + 1 <= size and grid[rowStart+ letterIdx + 1][colStart] not in [' ']):
                return False

            # Ensure each letter is placed on an empty or equal-letter square
            if grid[rowStart+letterIdx][colStart] not in [' ',letter]:
                return False

            # Ensure there are no other vertical words placed left/right
            if (letter != grid[rowStart+letterIdx][colStart] and colStart+1<=size and grid[rowStart+letterIdx][colStart+1] not in [' ']) \
            or (letter != grid[rowStart+letterIdx][colStart] and colStart-1>=0 and grid[rowStart+letterIdx][colStart-1] not in [' ']):
                return False

    return True

def place_word_in_grid(size, word, grid, rowStart, colStart, is_horizontal):

    for letterIdx, letter in enumerate(word):
        if is_horizontal:
            grid[rowStart][colStart+letterIdx] = letter
        else:
            grid[rowStart+letterIdx][colStart] = letter
    
    return grid

if __name__ == '__main__':
    main()