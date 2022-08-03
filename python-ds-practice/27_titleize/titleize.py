def titleize(phrase):
    """Return phrase in title case (each word capitalized).

        >>> titleize('this is awesome')
        'This Is Awesome'

        >>> titleize('oNLy cAPITALIZe fIRSt')
        'Only Capitalize First'
    """
    title = ""
    phraseLower = phrase.lower().split()
    
    for word in phraseLower:
        title = f"{title} {word.capitalize()}"

    return title[1::]
