#!/usr/bin/python
# Garbage collection script for strider.
#

import os
import shutil
import commands
import time
import stat
from sys import stdout

FREE_TARGET_GB = 50
ROOT_DIR = '/home/strider/.strider'


status, output = commands.getstatusoutput('env')
print('Environment: \n%s' % output)
stdout.flush()

while True:
  print 'Walking: ' + ROOT_DIR

  dirs = []
  for user in os.listdir(ROOT_DIR):
    if os.path.isdir(os.path.join(ROOT_DIR, user)):
      for branch in os.listdir(os.path.join(ROOT_DIR, user)):
        path = os.path.join(ROOT_DIR,user,branch)
        if not os.path.exists(os.path.join(path, '.box')):
          info = os.stat(path)
          dirs.append((path,info))
        else:
          print '%s: found .box, skipping.' % path
  dirs.sort(key = lambda d: d[1].st_mtime)

  print 'Cache directory count: ', len(dirs)

  def get_free():
    stats = os.statvfs(ROOT_DIR)
    return stats.f_bavail * stats.f_bsize / pow(1024,3)

  def onerror(func, path, exc_info):
    if not os.access(path, os.W_OK):
      print "NOTICE: Making rwx available to perform operation. Path = %s" % path
      os.chmod(path, stat.S_IRWXU)
      func(path)
    else:
      raise

  while get_free() < FREE_TARGET_GB and len(dirs) > 0:
    print 'Free space (GB): %s < Target (GB): %s ' % (get_free(), FREE_TARGET_GB)
    path = dirs[0][0]
    dirs = dirs[1:]
    print 'Removing:', path
    status, output = commands.getstatusoutput('cd %s && vagrant destroy -f' % path)
    print 'Vagrant: ', output
    try:
      shutil.rmtree(path, onerror=onerror)
    except OSError as e:
      print "ERROR: Unable to perform removal: %s Check path permissions" % path 

  stdout.flush()

  # Run at most once every 3H
  time.sleep(10800)
