def flip_case(phrase, to_swap):
    """Flip [to_swap] case each time it appears in phrase.

        >>> flip_case('Aaaahhh', 'a')
        'aAAAhhh'

        >>> flip_case('Aaaahhh', 'A')
        'aAAAhhh'

        >>> flip_case('Aaaahhh', 'h')
        'AaaaHHH'

    """
    to_swap = to_swap.lower()
    swappedCaseString = ""

    for l in phrase:
        if l == to_swap:
            swappedCaseString += l.upper()
        elif l.lower() == to_swap:
            swappedCaseString += l.lower()
        else:
            swappedCaseString += l
    return swappedCaseString
