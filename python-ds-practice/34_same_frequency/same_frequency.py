def same_frequency(num1, num2):
    """Do these nums have same frequencies of digits?
    
        >>> same_frequency(551122, 221515)
        True
        
        >>> same_frequency(321142, 3212215)
        False
        
        >>> same_frequency(1212, 2211)
        True
    """
    string1 = str(num1)
    string2 = str(num2)
    out1 = {}
    out2 = {}
    for i in string1:
        out1[i] = out1.get(i, 0) + 1
    for i in string2:
        out2[i] = out2.get(i, 0) + 1
    if out1 == out2:
        return True
    else:
        return False
