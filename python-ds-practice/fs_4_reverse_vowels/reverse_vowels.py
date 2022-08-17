def reverse_vowels(s):
    """Reverse vowels in a string.

    Characters which re not vowels do not change position in string, but all
    vowels (y is not a vowel), should reverse their order.

    >>> reverse_vowels("Hello!")
    'Holle!'

    >>> reverse_vowels("Tomatoes")
    'Temotaos'

    >>> reverse_vowels("Reverse Vowels In A String")
    'RivArsI Vewols en e Streng'

    reverse_vowels("aeiou")
    'uoiea'

    reverse_vowels("why try, shy fly?")
    'why try, shy fly?''
    """

    VOWELS = "aeiou"

    string = list(s)
    indexList = []
    vowelList = []

    for i in range(len(s)):
        if string[i].lower() in VOWELS:
            indexList.append(i)
            vowelList.append(string[i])

    for i in indexList:
        string[i] = vowelList[-1]
        vowelList.pop(-1)
    return "".join(string)
