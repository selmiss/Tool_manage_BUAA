import os
import re
import json

# constants
MINI_DATA_MAX_LEN = 32
BASIC_DATA_MAX_LEN = 96
EXT_DATA_MAX_LEN = 256
NAME_MAX_LEN = 16
PWD_MIN_LEN = 6
PWD_MAX_LEN = 20
DESC_MAX_LEN = 200
MAX_WRONG_PWD = 5
# checker lambdas
_TEL_REG = r'^[0-9]+$'
_EMAIL_REG = r'^[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+){0,4}@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+){0,4}$'
_PRINTABLE_UNICODES_WITHOUT_BLANK = lambda s: s.isprintable() and ' ' not in s
_PRINTABLE_ASCIIS_WITHOUT_BLANK = lambda s: _PRINTABLE_UNICODES_WITHOUT_BLANK(s) and all(ord(c) < 128 for c in s)

CHECK_NAME = lambda n: all([
    0 < len(n) <= NAME_MAX_LEN,
    _PRINTABLE_UNICODES_WITHOUT_BLANK(n),
])

CHECK_INTRO = lambda d: 0 <= len(d) <= 500

_CHECK_EMAIL = lambda e: all([
    0 < len(e) <= MINI_DATA_MAX_LEN,
    _PRINTABLE_ASCIIS_WITHOUT_BLANK(e),
    re.match(_EMAIL_REG, e),
])

_CHECK_TEL = lambda tel: all([
    0 < len(tel) <= MINI_DATA_MAX_LEN,
    all((c.isnumeric() or c == '+' or c == '-') for c in tel),
    re.match(_TEL_REG, tel),
])

CHECK_ACC = lambda acc: _CHECK_EMAIL(acc)

CHECK_PWD = lambda pwd: all([
    PWD_MIN_LEN <= len(pwd) <= PWD_MAX_LEN,
    _PRINTABLE_ASCIIS_WITHOUT_BLANK(pwd),
    any(c.isupper() for c in pwd)
    + any(c.islower() for c in pwd)
    + any(c.isnumeric() for c in pwd)
    + any(not c.isalnum() for c in pwd)
    >= 2
])

CHECK_DESCS = lambda d: 0 <= len(d) <= DESC_MAX_LEN

MESSAGE_type = (
    ('portal_create_request', '请求建立个人门户'),
    ('upload_document_request', '请求上传文件'),
    ('portal_approve_request', '认证个人门户请求'),
    ('accept_portal', '接受个人门户创建请求'),
    ('accpt_document', '接受文件上传请求'),
    ('refuse_portal', '拒绝个人门户创建请求'),
    ('refuse_document', '拒绝文件上传请求'),
    ('accpt_approve', '接受门户认证请求'),
    ('refuse_approve', '拒绝门户认证请求'),

)


TIME_FORMAT = '%Y-%m-%d'