def list_check(lst):
    """Are all items in lst a list?

        >>> list_check([[1], [2, 3]])
        True

        >>> list_check([[1], "nope"])
        False
    """
    count = 0
    for singleList in lst:
        if isinstance(singleList, list):
            count += 1
        else:
            return False

    if count == len(lst):
        return True
