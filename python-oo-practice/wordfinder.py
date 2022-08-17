import random
"""Word Finder: finds random words from a dictionary."""
class WordFinder:
    """
    >>> wf = WordFinder("animals.txt")
    16 words read
    >>> wf.random()
    'cat'

    >>> wf.random()
    'cat'

    >>> wf.random()
    'porcupine'

    >>> wf.random()
    'dog'
    """

    def __init__(self, path):
        self.path = path
        self.wordList = self.createWordList(path)
        print(f"{self.countWords()} words read")

    def countWords(self):
        count = 0
        with open(self.path) as file:
            for line in file:
                count += 1
        return count

    def createWordList(self, path):
        with open(path) as file:
            return [line.strip() for line in file]

    def random(self):
        return random.choice(self.wordList)

class SpecialWordFinder(WordFinder):
    """
    Specialized WordFinder that excludes blank lines/comments.
    
    >>> swf = SpecialWordFinder("animals.txt")
    3 words read

    >>> swf.random() in ["pear", "carrot", "kale"]
    True

    >>> swf.random() in ["pear", "carrot", "kale"]
    True

    >>> swf.random() in ["pear", "carrot", "kale"]
    True
    """

    def __init__(self, path):
         super().__init__(path)

    def wordFilter(self):
        with open(self.path) as file:
            return [line.strip() for line in file if line.strip() and not line.startswith("#")]
