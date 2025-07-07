from setuptools import setup

setup(name='doodl',
      version='0.9.1',
      description='A python module for including beautiful charts in Markdown for conversion to HTML',
      url='https://github.com/hubbl-ai/doodl',
      author='doodl.ai',
      author_email='info@doodl.ai',
      license='MIT',
      packages=['doodl'],
      zip_safe=False,
      entry_points = {
        'console_scripts': ['doodl=doodl.doodl:main'],
      },
      include_package_data=True,
      install_requires=[
          'pypandoc', 'beautifulsoup4', 'seaborn','colorcet','playwright', 'requests','ipython'
      ])
