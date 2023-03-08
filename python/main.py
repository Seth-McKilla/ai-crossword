import random
import json
import os

def main(gridLength=20,answerList=['Elephant','Buffalo','Colorado','Panda','Bear','Engineer','Overwatch','Valheim','Jeopardy']):
    # INPUTS: 1.  gridLength (int)          -> Crossword Puzzle grid is size x N (square)
    #         2.  answerList (list of str)  -> List of crossword answers
    #
    # OUTPUTS 1.  crosswordGlossary (dict) -> A dictionary composed of KEYS (clue numeric index),
    #             and VALUES (lists) organized like [row index, col index, answer, orientation]
    #             NOTE: The crosswordGlossary is written to file as crosswordGlossary.json

    # Input validation:
    # 1. Assert that the supplied gridLength is an integer. If assertion passes, assign int() to protect against float issues
    # 2. Assert that the supplied answerList is a list composed of strings. Validation should be done external to Python to ensure no non-alphanumeric strings show up here (e.g., '2')
    assert float(gridLength) and gridLength.__floor__() == gridLength, f"The main() 'gridLength' argument must be an integer. User-supplied value: {gridLength}"
    gridLength = int(gridLength)
    assert isinstance(answerList,list) and all([isinstance(element,str) for element in answerList]), f"The main() 'answerList' argument must be a Python list composed of string elements. User-supplied value: {answerList}"

    # Make call to generate the 'crossword' (list) and 'indexDict' (used for .json output)
    # NOTE: 'crossword' is only useful as a debugging tool, can be removed later
    crossword, indexDict = generate_crossword(size=gridLength,answerBank=answerList)

    # Once we have all placed crossword answers, generate a dictionary, 'crosswordGlossary', composed of the results:
    # KEY:      The index of the crossword clue (i.e. the numeric value that shows up in the crossword box corresponding to the answer's first letter)
    # VALUES:   [Row Index, Column Index, Corresponding Word, Orientation]
    #           NOTE: The row & column indices begin at ZERO (not 1)
    [element.append('DOWN') for element in indexDict['DOWN']]
    [element.append('ACROSS') for element in indexDict['ACROSS']]

    tempList = list()
    [tempList.append(element) for element in indexDict['DOWN']]
    [tempList.append(element) for element in indexDict['ACROSS']]
    tempList.sort()

    crosswordGlossary = dict()
    for elementIdx, element in enumerate(tempList):
        crosswordGlossary[elementIdx+1] = element

    json_output = json.dumps(crosswordGlossary)
    # Build output directory and store the crosswordGlossary.json to file
    outputDirectory = os.path.abspath(os.path.join(os.path.dirname(__file__),'output'))
    if not os.path.exists(outputDirectory):
        os.mkdir(outputDirectory)
    with open(os.path.abspath(os.path.join(outputDirectory,'crossword_glossary.json')),"w") as outfile:
        outfile.write(json_output)

    # DEBUG UTILS
    #print(json_string)
    # Send out the glossary with json
    #for row in crossword:
    #    print(' '.join(row))
    
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

            # Ensure empty (or exterior) nodes to the left + right of the word\
            #if (letterIdx == 0 and colStart - 1 < 0) or (letterIdx == len(word)-1 and colStart + letterIdx + 1 > size):
            #    return True
            if letterIdx == 0 and colStart - 1 >= 0:
                if grid[rowStart][colStart - 1] not in [' ']:
                    return False
            elif letterIdx == len(word)-1 and colStart + letterIdx + 1 <= size:
                if grid[rowStart][colStart + letterIdx + 1] not in [' ']:
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
            #if (letterIdx == 0 and rowStart - 1 < 0) or (letterIdx == len(word)-1 and rowStart + letterIdx + 1 > size):
            #    break
            if letterIdx == 0 and rowStart - 1 >= 0:
                if grid[rowStart - 1][colStart] not in [' ']:
                    return False
            elif letterIdx == len(word)-1 and rowStart + letterIdx + 1 <= size:
                if grid[rowStart+ letterIdx + 1][colStart] not in [' ']:
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