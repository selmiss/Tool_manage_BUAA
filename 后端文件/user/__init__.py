def __init(**kwargs):
    """
    初始化全局变量 【Dict】
    :param kwargs: 初始化参数 k=v
    :return:
    """
    global TOKEN_DIC
    TOKEN_DIC = kwargs if kwargs else {}

TOKEN_DIC={
    'hashcode':-1,
}